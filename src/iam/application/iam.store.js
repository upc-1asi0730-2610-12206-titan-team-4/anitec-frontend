import {defineStore} from "pinia";
import {computed, ref} from "vue";

const defaultDemoUsers = [
    {
        id: 1,
        username: 'ganadero',
        password: 'anitec123',
        role: 'rancher',
        fullName: 'Carlos Mendoza',
        veterinarianId: 2
    },
    {
        id: 2,
        username: 'veterinaria',
        password: 'anitec123',
        role: 'veterinarian',
        fullName: 'Dra. Ana Lopez'
    },
    {
        id: 3,
        username: 'maria',
        password: 'anitec123',
        role: 'rancher',
        fullName: 'Maria Gonzales',
        veterinarianId: 2
    },
    {
        id: 4,
        username: 'jose',
        password: 'anitec123',
        role: 'rancher',
        fullName: 'Jose Quispe',
        veterinarianId: 5
    },
    {
        id: 5,
        username: 'vetpedro',
        password: 'anitec123',
        role: 'veterinarian',
        fullName: 'Dr. Pedro Ramirez'
    },
    {
        id: 6,
        username: 'rosa',
        password: 'anitec123',
        role: 'rancher',
        fullName: 'Rosa Huaman',
        veterinarianId: 7
    },
    {
        id: 7,
        username: 'vetlucia',
        password: 'anitec123',
        role: 'veterinarian',
        fullName: 'Dra. Lucia Torres'
    }
];

const sessionKey = 'anitec-session';

const demoUsersKey = 'anitec-demo-users';

/**
 * Reads the session saved in localStorage.
 * @returns {Object|null}
 */
const readSession = () => {
    try {
        return JSON.parse(localStorage.getItem(sessionKey));
    } catch {
        return null;
    }
};

/**
 * Reads saved demo users or returns the default users.
 * @returns {Object[]}
 */
const readDemoUsers = () => {
    try {
        const users = JSON.parse(localStorage.getItem(demoUsersKey));

        if (users) {
            return users;
        }

        return defaultDemoUsers;
    } catch {
        return defaultDemoUsers;
    }
};

/**
 * Saves demo users to keep assignment changes.
 * @param {Object[]} users Updated demo users.
 */
const saveDemoUsers = (users) => {
    localStorage.setItem(demoUsersKey, JSON.stringify(users));
};

/**
 * Store that manages the current session and demo users.
 */
const useIamStore = defineStore('iam', () => {

    const savedSession = readSession();

    const demoUsers = ref(readDemoUsers());

    const currentUser = ref(savedSession);

    const errors = ref([]);

    const isSignedIn = computed(() => {
        if (currentUser.value) {
            return true;
        }

        return false;
    });

    const currentUserId = computed(() => {
        if (currentUser.value) {
            return currentUser.value.id;
        }

        return 0;
    });

    const currentRole = computed(() => {
        if (currentUser.value) {
            return currentUser.value.role;
        }

        return null;
    });

    const currentFullName = computed(() => {
        if (currentUser.value) {
            return currentUser.value.fullName;
        }

        return '';
    });

    /**
     * Validates demo credentials, saves the session, and redirects by role.
     * @param {Object} credentials Entered username and password.
     * @param {Object} router Vue Router instance used after login.
     * @returns {boolean}
     */
    function signIn(credentials, router) {

        let username = '';

        if (credentials.username) {
            username = credentials.username.trim();
        }

        let user = null;

        for (let i = 0; i < demoUsers.value.length; i++) {
            const item = demoUsers.value[i];

            if (item.username === username && item.password === credentials.password) {
                user = item;
            }
        }

        if (!user) {
            errors.value = [new Error('Invalid credentials')];
            return false;
        }
        
        let veterinarianId = null;

        if (user.veterinarianId) {
            veterinarianId = user.veterinarianId;
        }

        const session = {
            id: user.id,
            username: user.username,
            role: user.role,
            fullName: user.fullName,
            veterinarianId: veterinarianId
        };

        currentUser.value = session;
        errors.value = [];
        localStorage.setItem(sessionKey, JSON.stringify(session));
        localStorage.setItem('token', `demo-token-${user.role}`);

        if (user.role === 'rancher') router.push({name: 'rancher-dashboard'});
        if (user.role === 'veterinarian') router.push({name: 'veterinarian-dashboard'});
        return true;
    }

    /**
     * Assigns a rancher to a veterinarian portfolio.
     * @param {number|string} rancherId Rancher identifier.
     * @param {number|string} veterinarianId Veterinarian identifier.
     * @returns {boolean}
     */
    function assignRancherToVeterinarian(rancherId, veterinarianId = currentUserId.value) {

        let rancherIndex = -1;

        for (let i = 0; i < demoUsers.value.length; i++) {
            const user = demoUsers.value[i];

            if (user.role === 'rancher' && Number(user.id) === Number(rancherId)) {
                rancherIndex = i;
            }
        }

        let veterinarian = null;

        for (let i = 0; i < demoUsers.value.length; i++) {
            const user = demoUsers.value[i];

            if (user.role === 'veterinarian' && Number(user.id) === Number(veterinarianId)) {
                veterinarian = user;
            }
        }

        if (rancherIndex === -1) {
            return false;
        }

        if (!veterinarian) {
            return false;
        }

        demoUsers.value[rancherIndex].veterinarianId = veterinarian.id;
        saveDemoUsers(demoUsers.value);
        return true;
    }

    /**
     * Removes the relationship between a rancher and a veterinarian.
     * @param {number|string} rancherId Rancher identifier.
     * @param {number|string} veterinarianId Veterinarian identifier.
     * @returns {boolean}
     */
    function unassignRancherFromVeterinarian(rancherId, veterinarianId = currentUserId.value) {

        let rancherIndex = -1;

        for (let i = 0; i < demoUsers.value.length; i++) {
            const user = demoUsers.value[i];

            if (
                user.role === 'rancher' &&
                Number(user.id) === Number(rancherId) &&
                Number(user.veterinarianId) === Number(veterinarianId)
            ) {
                rancherIndex = i;
            }
        }

        if (rancherIndex === -1) return false;

        demoUsers.value[rancherIndex].veterinarianId = null;
        saveDemoUsers(demoUsers.value);
        return true;
    }

    /**
     * Closes the current session and clears saved data.
     * @param {Object} router Vue Router instance used to return to login.
     */
    function signOut(router) {
        currentUser.value = null;
        errors.value = [];
        localStorage.removeItem(sessionKey);
        localStorage.removeItem('token');

        if (router) {
            router.push({name: 'iam-sign-in'});
        }
    }

    return {
        demoUsers,
        errors,
        currentUser,
        currentUserId,
        currentRole,
        currentFullName,
        isSignedIn,
        signIn,
        signOut,
        assignRancherToVeterinarian,
        unassignRancherFromVeterinarian
    };
});

export default useIamStore;
