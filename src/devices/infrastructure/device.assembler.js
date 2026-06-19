/**
 * Converts backend device resources into frontend device objects.
 */
export class DeviceAssembler {
    /**
     * Converts one device resource.
     * @param {Object} resource Device data from backend.
     * @returns {Object}
     */
    static toEntityFromResource(resource) {
        return {
            id: resource.id,
            name: resource.name,
            type: resource.type,
            serialNumber: resource.serialNumber,
            status: resource.status,
            herdId: resource.herdId ? Number(resource.herdId) : null,
            animalId: resource.animalId ? Number(resource.animalId) : null,
        };
    }

    /**
     * Converts a response into a device list.
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
