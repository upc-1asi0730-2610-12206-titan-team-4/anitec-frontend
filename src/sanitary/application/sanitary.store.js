import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { SanitaryApi } from "../infrastructure/sanitary-api.js";
import { HealthEventAssembler } from "../infrastructure/health-event.assembler.js";

const api = new SanitaryApi();

/**
 * Store that manages animal health records.
 */
const useSanitaryStore = defineStore("sanitary", () => {
    const healthEvents = ref([]);

    const errors = ref([]);

    const loaded = ref(false);

    const pendingAlerts = computed(() => {
        let total = 0;

        healthEvents.value.forEach((event) => {
            if (event.nextDueDate) {
                total++;
            }
        });

        return total;
    });

    /**
     * Loads health records from the API.
     * @returns {Promise}
     */
    function fetchHealthEvents() {
        return api
            .getHealthEvents()
            .then((response) => {
                healthEvents.value =
                    HealthEventAssembler.toEntitiesFromResponse(response);
                loaded.value = true;
            })
            .catch((error) => errors.value.push(error));
    }

    /**
     * Finds a health record by its identifier.
     * @param {number|string} id Record identifier.
     * @returns {Object|null}
     */
    function getHealthEventById(id) {
        let selectedHealthEvent = null;

        for (let i = 0; i < healthEvents.value.length; i++) {
            const event = healthEvents.value[i];

            if (Number(event.id) === Number(id)) {
                selectedHealthEvent = event;
            }
        }

        return selectedHealthEvent;
    }

    /**
     * Registers a new health event.
     * @param {Object} event Health record data.
     * @returns {Promise}
     */
    function addHealthEvent(event) {
        return api
            .createHealthEvent(event)
            .then((response) =>
                healthEvents.value.push(
                    HealthEventAssembler.toEntityFromResource(response.data),
                ),
            )
            .catch((error) => errors.value.push(error));
    }

    /**
     * Updates an existing health record.
     * @param {Object} event Updated record data.
     * @returns {Promise}
     */
    function updateHealthEvent(event) {
        return api
            .updateHealthEvent(event)
            .then((response) => {
                const updated = HealthEventAssembler.toEntityFromResource(
                    response.data,
                );

                let index = -1;

                for (let i = 0; i < healthEvents.value.length; i++) {
                    const item = healthEvents.value[i];

                    if (Number(item.id) === Number(updated.id)) {
                        index = i;
                    }
                }

                if (index !== -1) healthEvents.value[index] = updated;
            })
            .catch((error) => errors.value.push(error));
    }

    /**
     * Deletes a health record and updates the local list.
     * @param {Object} event Selected record.
     * @returns {Promise}
     */
    function deleteHealthEvent(event) {
        return api
            .deleteHealthEvent(event.id)
            .then(() => {
                const newHealthEvents = [];

                healthEvents.value.forEach((item) => {
                    if (Number(item.id) !== Number(event.id)) {
                        newHealthEvents.push(item);
                    }
                });

                healthEvents.value = newHealthEvents;
            })
            .catch((error) => errors.value.push(error));
    }

    return {
        healthEvents,
        errors,
        loaded,
        pendingAlerts,
        fetchHealthEvents,
        getHealthEventById,
        addHealthEvent,
        updateHealthEvent,
        deleteHealthEvent,
    };
});

export default useSanitaryStore;
