import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

const plansEndpointPath =
    import.meta.env.VITE_SUBSCRIPTION_PLANS_ENDPOINT_PATH ||
    "/subscription-plans";

/**
 * Handles HTTP requests for subscription plans and Stripe test payments.
 */
export class SubscriptionsApi extends BaseApi {
    #plansEndpoint;

    constructor() {
        super();
        this.#plansEndpoint = new BaseEndpoint(this, plansEndpointPath);
    }

    /** @returns {Promise} Lists subscription plans. */
    getPlans() {
        return this.#plansEndpoint.getAll();
    }

    /** @param {number|string} userId User identifier. @returns {Promise} */
    getActiveSubscription(userId) {
        return this.http.get(`/subscriptions/users/${userId}/active`);
    }

    /** @param {number|string} userId User identifier. @returns {Promise} */
    getPayments(userId) {
        return this.http.get(`/subscriptions/users/${userId}/payments`);
    }

    /** @param {number|string} planId Subscription plan identifier. @returns {Promise} */
    createStripeCheckout(planId) {
        return this.http.post("/subscriptions/stripe-checkout", { planId });
    }

    /** @param {string} sessionId Stripe checkout session identifier. @returns {Promise} */
    confirmStripeCheckout(sessionId) {
        return this.http.get(`/subscriptions/stripe-checkout/${sessionId}/confirm`);
    }
}
