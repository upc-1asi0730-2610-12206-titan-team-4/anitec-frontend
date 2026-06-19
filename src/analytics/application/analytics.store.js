import { defineStore } from "pinia";
import { ref } from "vue";
import { AnalyticsApi } from "../infrastructure/analytics-api.js";
import { AnalyticsMetricAssembler } from "../infrastructure/analytics-metric.assembler.js";

const api = new AnalyticsApi();

/**
 * Store that manages the metrics used in analytics.
 */
const useAnalyticsStore = defineStore("analytics", () => {
    const metrics = ref([]);

    const dashboard = ref(null);

    const errors = ref([]);

    const loaded = ref(false);

    /**
     * Loads metrics from the API.
     * @returns {Promise}
     */
    function fetchMetrics() {
        return api
            .getMetrics()
            .then((response) => {
                metrics.value =
                    AnalyticsMetricAssembler.toEntitiesFromResponse(response);
                loaded.value = true;
            })
            .catch((error) => errors.value.push(error));
    }

    /**
     * Loads backend dashboard aggregates according to the current role.
     * @param {string} role Normalized frontend role.
     * @param {number|string} userId Current user identifier.
     * @returns {Promise<Object|null>}
     */
    function fetchDashboard(role, userId) {
        const request =
            role === "veterinarian"
                ? api.getVeterinarianDashboard(userId)
                : api.getRancherDashboard(userId);

        return request
            .then((response) => {
                dashboard.value = response.data;
                return dashboard.value;
            })
            .catch((error) => {
                errors.value.push(error);
                return null;
            });
    }

    return {
        metrics,
        dashboard,
        errors,
        loaded,
        fetchMetrics,
        fetchDashboard,
    };
});

export default useAnalyticsStore;
