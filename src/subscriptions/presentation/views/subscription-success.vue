<script setup>
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import useIamStore from "../../../iam/application/iam.store.js";
import useSubscriptionsStore from "../../application/subscriptions.store.js";

const { t } = useI18n();

const route = useRoute();

const router = useRouter();

const iam = useIamStore();

const subscriptions = useSubscriptionsStore();

const sessionId = computed(() => route.query.session_id || "");

onMounted(async () => {
  if (sessionId.value) {
    await subscriptions.confirmCheckout(sessionId.value, iam.currentUserId);
  }
});
</script>

<template>
  <section class="panel payment-result-panel">
    <div class="form-hero">
      <i class="pi pi-check-circle"></i>
      <div>
        <span class="section-chip">Stripe Checkout</span>
        <h2>{{ t("subscriptions.successTitle") }}</h2>
        <p>{{ t("subscriptions.successSubtitle") }}</p>
      </div>
    </div>

    <p v-if="subscriptions.loading" class="empty-state">
      {{ t("subscriptions.confirmingPayment") }}
    </p>
    <p v-else-if="!sessionId" class="error-text">
      {{ t("subscriptions.missingSession") }}
    </p>
    <p v-else-if="subscriptions.errors.length" class="error-text">
      {{ t("subscriptions.confirmationError") }}
    </p>
    <p v-else class="empty-state">
      {{ t("subscriptions.confirmedPayment") }}
    </p>

    <div class="form-actions friendly-actions">
      <pv-button
        :label="t('subscriptions.backToPlans')"
        icon="pi pi-credit-card"
        @click="router.push({ name: 'subscription-plans' })"
      />
    </div>
  </section>
</template>
