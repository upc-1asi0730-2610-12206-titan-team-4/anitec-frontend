import {AnalyticsMetric} from "../domain/model/analytics-metric.entity.js";

/**
 * Converts data received from the API into AnalyticsMetric entities.
 */
export class AnalyticsMetricAssembler {
    /**
     * Converts a simple resource into an AnalyticsMetric entity.
     * @param {Object} resource Metric data.
     * @returns {AnalyticsMetric}
     */
    static toEntityFromResource(resource) {
        return new AnalyticsMetric({...resource});
    }

    /**
     * Converts an HTTP response into a list of metrics.
     * @param {Object} response API response.
     * @returns {AnalyticsMetric[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) return [];

        const resources = Array.isArray(response.data) ? response.data : response.data['report-metrics'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
