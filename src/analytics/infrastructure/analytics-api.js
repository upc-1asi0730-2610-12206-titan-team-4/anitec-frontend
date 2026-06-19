import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

const analyticsMetricsEndpointPath = import.meta.env
    .VITE_ANALYTICS_METRICS_ENDPOINT_PATH;

/**
 * Handles HTTP requests for analytics metrics.
 */
export class AnalyticsApi extends BaseApi {
    #metricsEndpoint;

    /**
     * Prepares the endpoint where metrics are queried.
     */
    constructor() {
        super();
        this.#metricsEndpoint = new BaseEndpoint(
            this,
            analyticsMetricsEndpointPath,
        );
    }

    /** @returns {Promise} Lists analytics metrics. */
    getMetrics() {
        return this.#metricsEndpoint.getAll();
    }

    /** @param {number|string} rancherId Rancher identifier. @returns {Promise} */
    getRancherDashboard(rancherId) {
        return this.http.get(`/analytics/ranchers/${rancherId}/dashboard`);
    }

    /** @param {number|string} veterinarianId Veterinarian identifier. @returns {Promise} */
    getVeterinarianDashboard(veterinarianId) {
        return this.http.get(
            `/analytics/veterinarians/${veterinarianId}/dashboard`,
        );
    }
}
