import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { ActivitiesApi } from "../infrastructure/activities-api.js";
import { FarmActivityAssembler } from "../infrastructure/farm-activity.assembler.js";

const api = new ActivitiesApi();

/**
 * Store that manages calendar activities.
 */
const useActivitiesStore = defineStore("activities", () => {
    const activities = ref([]);

    const errors = ref([]);

    const loaded = ref(false);

    const highPriorityCount = computed(() => {
        let total = 0;

        activities.value.forEach((activity) => {
            if (activity.priority === "Alta") {
                total++;
            }
        });

        return total;
    });

    function getActivitiesByOwnerId(ownerId) {
        const ownerActivities = [];

        activities.value.forEach((activity) => {
            if (Number(activity.ownerId) === Number(ownerId)) {
                ownerActivities.push(activity);
            }
        });

        return ownerActivities;
    }

    function getActivitiesByVeterinarianId(veterinarianId) {
        const veterinarianActivities = [];

        activities.value.forEach((activity) => {
            if (Number(activity.veterinarianId) === Number(veterinarianId)) {
                veterinarianActivities.push(activity);
            }
        });

        return veterinarianActivities;
    }

    function getActivitiesByUser(role, userId) {
        if (role === "veterinarian") return getActivitiesByVeterinarianId(userId);
        return getActivitiesByOwnerId(userId);
    }

    function getHighPriorityCountByUser(role, userId) {
        let total = 0;

        getActivitiesByUser(role, userId).forEach((activity) => {
            if (activity.priority === "Alta") {
                total++;
            }
        });

        return total;
    }

    /**
     * Loads activities from the API.
     * @returns {Promise}
     */
    function fetchActivities() {
        return api
            .getActivities()
            .then((response) => {
                activities.value =
                    FarmActivityAssembler.toEntitiesFromResponse(response);
                loaded.value = true;
            })
            .catch((error) => errors.value.push(error));
    }

    /**
     * Finds an activity by its identifier.
     * @param {number|string} id Activity identifier.
     * @returns {Object|null}
     */
    function getActivityById(id) {
        let selectedActivity = null;

        for (let i = 0; i < activities.value.length; i++) {
            const activity = activities.value[i];

            if (Number(activity.id) === Number(id)) {
                selectedActivity = activity;
            }
        }

        return selectedActivity;
    }

    /**
     * Registers a new activity.
     * @param {Object} activity Activity data.
     * @returns {Promise}
     */
    function addActivity(activity) {
        return api
            .createActivity(activity)
            .then((response) => {
                activities.value.push(
                    FarmActivityAssembler.toEntityFromResource(response.data),
                );
                errors.value = [];
                return true;
            })
            .catch((error) => {
                errors.value.push(error);
                return false;
            });
    }

    /**
     * Updates an existing activity.
     * @param {Object} activity Updated activity data.
     * @returns {Promise}
     */
    function updateActivity(activity) {
        return api
            .updateActivity(activity)
            .then((response) => {
                const updated = FarmActivityAssembler.toEntityFromResource(
                    response.data,
                );

                let index = -1;

                for (let i = 0; i < activities.value.length; i++) {
                    const item = activities.value[i];

                    if (Number(item.id) === Number(updated.id)) {
                        index = i;
                    }
                }

                if (index !== -1) activities.value[index] = updated;
                errors.value = [];
                return true;
            })
            .catch((error) => {
                errors.value.push(error);
                return false;
            });
    }

    /**
     * Deletes an activity and updates the local list.
     * @param {Object} activity Selected activity.
     * @returns {Promise}
     */
    function deleteActivity(activity) {
        return api
            .deleteActivity(activity.id)
            .then(() => {
                const newActivities = [];

                activities.value.forEach((item) => {
                    if (Number(item.id) !== Number(activity.id)) {
                        newActivities.push(item);
                    }
                });

                activities.value = newActivities;
            })
            .catch((error) => errors.value.push(error));
    }

    return {
        activities,
        errors,
        loaded,
        highPriorityCount,
        getActivitiesByOwnerId,
        getActivitiesByVeterinarianId,
        getActivitiesByUser,
        getHighPriorityCountByUser,
        fetchActivities,
        getActivityById,
        addActivity,
        updateActivity,
        deleteActivity,
    };
});

export default useActivitiesStore;
