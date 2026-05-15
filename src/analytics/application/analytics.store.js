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

    return { metrics, errors, loaded, fetchMetrics };
});

export default useAnalyticsStore;
