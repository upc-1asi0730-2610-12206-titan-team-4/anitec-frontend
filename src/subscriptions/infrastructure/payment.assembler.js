/**
 * Converts backend payment resources into frontend payment objects.
 */
export class PaymentAssembler {
    /**
     * Converts one payment resource.
     * @param {Object} resource Payment data from backend.
     * @returns {Object}
     */
    static toEntityFromResource(resource) {
        return {
            id: resource.id,
            userId: Number(resource.userId),
            subscriptionId: Number(resource.subscriptionId),
            amount: Number(resource.amount),
            currency: resource.currency,
            provider: resource.provider,
            providerPaymentId: resource.providerPaymentId,
            status: resource.status,
            paidAt: resource.paidAt,
        };
    }

    /**
     * Converts a response into a payment list.
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
