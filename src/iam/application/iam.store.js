import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { IamApi } from "../infrastructure/iam-api.js";

const api = new IamApi();

const sessionKey = "anitec-session";

const normalizeRole = (role) => {
    if (!role) return null;

    const normalized = String(role).toLowerCase();

    if (normalized === "rancher") return "rancher";
    if (normalized === "veterinarian") return "veterinarian";

    return normalized;
};

const toUserFromResource = (resource) => ({
    id: resource.id,
    username: resource.username,
    role: normalizeRole(resource.role),
    fullName: resource.fullName || resource.username,
    veterinarianId: resource.veterinarianId || null,
});

const getResponseList = (response) => {
    if (Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.data?.data)) return response.data.data;
    return [];
};

const readSession = () => {
    try {
        const session = JSON.parse(localStorage.getItem(sessionKey));
        const token = localStorage.getItem("token");

        if (!session || !token) {
            localStorage.removeItem(sessionKey);
            localStorage.removeItem("token");
            return null;
        }

        return session;
    } catch {
        return null;
    }
};

const useIamStore = defineStore("iam", () => {
    const savedSession = readSession();

    const users = ref([]);

    const currentUser = ref(savedSession);

    const errors = ref([]);

    const isSignedIn = computed(() => !!currentUser.value);

    const currentUserId = computed(() => {
        if (currentUser.value) return currentUser.value.id;
        return 0;
    });

    const currentRole = computed(() => {
        if (currentUser.value) return currentUser.value.role;
        return null;
    });

    const currentFullName = computed(() => {
        if (currentUser.value) return currentUser.value.fullName;
        return "";
    });

    function mergeUsers(nextUsers) {
        const usersById = new Map();

        users.value.forEach((user) => {
            usersById.set(Number(user.id), { ...user });
        });

        nextUsers.forEach((user) => {
            usersById.set(Number(user.id), { ...user });
        });

        users.value = Array.from(usersById.values());
    }

    function fetchUsers() {
        return api
            .getUsers()
            .then((response) => {
                users.value = getResponseList(response).map(toUserFromResource);
                return users.value;
            })
            .catch((error) => {
                errors.value.push(error);
                return users.value;
            });
    }

    function fetchVeterinarianClients(veterinarianId = currentUserId.value) {
        return api
            .getVeterinarianClients(veterinarianId)
            .then((response) => {
                const clientIds = [];
                const clients = getResponseList(response).map((client) => {
                    const rancherId = Number(client.rancherId);

                    clientIds.push(rancherId);
                    return {
                        id: rancherId,
                        username: client.username || `rancher-${rancherId}`,
                        role: "rancher",
                        fullName:
                            client.rancherName ||
                            client.fullName ||
                            client.username ||
                            `Ganadero ${rancherId}`,
                        veterinarianId: Number(veterinarianId),
                    };
                });

                mergeUsers(clients);

                users.value = users.value.map((user) => {
                    if (
                        user.role === "rancher" &&
                        Number(user.veterinarianId) ===
                            Number(veterinarianId) &&
                        !clientIds.includes(Number(user.id))
                    ) {
                        return { ...user, veterinarianId: null };
                    }

                    return user;
                });

                return clients;
            })
            .catch((error) => {
                errors.value.push(error);
                return [];
            });
    }

    function fetchAvailableRanchers(veterinarianId = currentUserId.value) {
        return api
            .getAvailableRanchers(veterinarianId)
            .then((response) => {
                const ranchers = getResponseList(response).map((resource) => ({
                    ...toUserFromResource(resource),
                    role: "rancher",
                    veterinarianId: null,
                }));

                mergeUsers(ranchers);
                return ranchers;
            })
            .catch((error) => {
                errors.value.push(error);
                return [];
            });
    }

    async function signIn(credentials, router) {
        try {
            const username = credentials.username
                ? credentials.username.trim()
                : "";
            const response = await api.signIn({
                username,
                password: credentials.password,
            });
            const user = response.data;
            const role = normalizeRole(user.role);

            const session = {
                id: user.id,
                username: user.username,
                role,
                fullName: user.fullName || user.username,
                token: user.token,
            };

            currentUser.value = session;
            errors.value = [];
            localStorage.setItem(sessionKey, JSON.stringify(session));
            localStorage.setItem("token", user.token);

            await fetchUsers();

            if (role === "veterinarian") {
                await fetchVeterinarianClients(user.id);
            }

            if (role === "rancher") router.push({ name: "rancher-dashboard" });
            if (role === "veterinarian")
                router.push({ name: "veterinarian-dashboard" });

            return true;
        } catch {
            errors.value = [new Error("Credenciales invalidas o API no disponible")];
            return false;
        }
    }

    async function signUp(resource, router) {
        try {
            await api.signUp({
                username: resource.username ? resource.username.trim() : "",
                password: resource.password,
                fullName: resource.fullName ? resource.fullName.trim() : "",
                role: resource.role,
            });

            errors.value = [];

            if (router) router.push({ name: "iam-sign-in" });

            return true;
        } catch {
            errors.value = [new Error("No se pudo registrar el usuario")];
            return false;
        }
    }

    async function assignRancherToVeterinarian(
        rancherId,
        veterinarianId = currentUserId.value,
    ) {
        try {
            await api.addVeterinarianClient(veterinarianId, rancherId);
        } catch (error) {
            errors.value.push(error);
            return false;
        }

        const rancherIndex = users.value.findIndex(
            (user) =>
                user.role === "rancher" &&
                Number(user.id) === Number(rancherId),
        );

        if (rancherIndex === -1) return false;

        users.value[rancherIndex].veterinarianId = Number(veterinarianId);
        return true;
    }

    async function unassignRancherFromVeterinarian(
        rancherId,
        veterinarianId = currentUserId.value,
    ) {
        try {
            await api.removeVeterinarianClient(veterinarianId, rancherId);
        } catch (error) {
            errors.value.push(error);
            return false;
        }

        const rancherIndex = users.value.findIndex(
            (user) =>
                user.role === "rancher" &&
                Number(user.id) === Number(rancherId) &&
                Number(user.veterinarianId) === Number(veterinarianId),
        );

        if (rancherIndex === -1) return false;

        users.value[rancherIndex].veterinarianId = null;
        return true;
    }

    function signOut(router) {
        currentUser.value = null;
        users.value = [];
        errors.value = [];
        localStorage.removeItem(sessionKey);
        localStorage.removeItem("token");

        if (router) {
            router.push({ name: "iam-sign-in" });
        }
    }

    return {
        users,
        errors,
        currentUser,
        currentUserId,
        currentRole,
        currentFullName,
        isSignedIn,
        fetchUsers,
        fetchVeterinarianClients,
        fetchAvailableRanchers,
        signIn,
        signUp,
        signOut,
        assignRancherToVeterinarian,
        unassignRancherFromVeterinarian,
    };
});

export default useIamStore;
