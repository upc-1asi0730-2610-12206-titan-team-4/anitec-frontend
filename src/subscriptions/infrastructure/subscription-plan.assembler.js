/**
 * Converts backend subscription plan resources into frontend objects.
 */
export class SubscriptionPlanAssembler {
    /**
     * Converts one subscription plan resource.
     * @param {Object} resource Plan data from backend.
     * @returns {Object}
     */
    static toEntityFromResource(resource) {
        return {
            id: resource.id,
            name: resource.name,
            price: Number(resource.price),
            stripePriceId: resource.stripePriceId,
            maxAnimals: Number(resource.maxAnimals),
            isActive: Boolean(resource.isActive),
        };
    }

    /**
     * Converts a response into a plan list.
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
