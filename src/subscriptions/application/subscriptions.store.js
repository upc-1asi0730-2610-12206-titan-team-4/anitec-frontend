import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { SubscriptionsApi } from "../infrastructure/subscriptions-api.js";
import { SubscriptionPlanAssembler } from "../infrastructure/subscription-plan.assembler.js";
import { PaymentAssembler } from "../infrastructure/payment.assembler.js";

const api = new SubscriptionsApi();

/**
 * Store that manages plans, active subscriptions, and test payments.
 */
const useSubscriptionsStore = defineStore("subscriptions", () => {
    const plans = ref([]);

    const activeSubscription = ref(null);

    const payments = ref([]);

    const lastCheckout = ref(null);

    const errors = ref([]);

    const loaded = ref(false);

    const loading = ref(false);

    const activePlan = computed(() => {
        if (!activeSubscription.value) return null;

        let selectedPlan = null;

        plans.value.forEach((plan) => {
            if (Number(plan.id) === Number(activeSubscription.value.planId)) {
                selectedPlan = plan;
            }
        });

        return selectedPlan;
    });

    function fetchPlans() {
        loading.value = true;
        return api
            .getPlans()
            .then((response) => {
                plans.value =
                    SubscriptionPlanAssembler.toEntitiesFromResponse(response);
                loaded.value = true;
                errors.value = [];
                return plans.value;
            })
            .catch((error) => errors.value.push(error))
            .finally(() => {
                loading.value = false;
            });
    }

    function fetchActiveSubscription(userId) {
        return api
            .getActiveSubscription(userId)
            .then((response) => {
                activeSubscription.value = response.data;
                return response.data;
            })
            .catch((error) => {
                if (error.response?.status !== 404) errors.value.push(error);
                activeSubscription.value = null;
                return null;
            });
    }

    function fetchPayments(userId) {
        return api
            .getPayments(userId)
            .then((response) => {
                payments.value = PaymentAssembler.toEntitiesFromResponse(response);
                return payments.value;
            })
            .catch((error) => errors.value.push(error));
    }

    function checkout(userId, plan) {
        return api
            .mockCheckout({
                userId,
                planId: plan.id,
                amount: plan.price,
                currency: "PEN",
            })
            .then((response) => {
                lastCheckout.value = response.data;
                activeSubscription.value = response.data.subscription;
                payments.value = [
                    PaymentAssembler.toEntityFromResource(response.data.payment),
                    ...payments.value,
                ];
                return response.data;
            })
            .catch((error) => errors.value.push(error));
    }

    return {
        plans,
        activeSubscription,
        payments,
        lastCheckout,
        errors,
        loaded,
        loading,
        activePlan,
        fetchPlans,
        fetchActiveSubscription,
        fetchPayments,
        checkout,
    };
});

export default useSubscriptionsStore;
