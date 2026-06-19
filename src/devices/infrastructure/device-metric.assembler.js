/**
 * Converts backend device metric resources into frontend objects.
 */
export class DeviceMetricAssembler {
    /**
     * Converts one device metric resource.
     * @param {Object} resource Metric data from backend.
     * @returns {Object}
     */
    static toEntityFromResource(resource) {
        return {
            id: resource.id,
            deviceId: Number(resource.deviceId),
            type: resource.type,
            value: Number(resource.value),
            unit: resource.unit,
            recordedAt: resource.recordedAt,
        };
    }

    /**
     * Converts a response into a metric list.
     * @param {Object} response HTTP response.
     * @returns {Object[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) return [];

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data?.data || [];
        return resources.map((resource) => this.toEntityFromResource(resource));
    }
}
