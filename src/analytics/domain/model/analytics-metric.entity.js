/**
 * Represents a summary metric for the analytics view.
 */
export class AnalyticsMetric {

    /**
     * Creates a visual metric with label, value, and trend.
     * @param {Object} metric Metric data.
     */
    constructor({ id = null, label = '', value = '', trend = '' }) {
        this.id = id;
        this.label = label;
        this.value = value;
        this.trend = trend;
    }
}
