<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();

const router = useRouter();
</script>

<template>
  <section class="panel payment-result-panel">
    <div class="form-hero">
      <i class="pi pi-times-circle"></i>
      <div>
        <span class="section-chip">Stripe Checkout</span>
        <h2>{{ t("subscriptions.cancelTitle") }}</h2>
        <p>{{ t("subscriptions.cancelSubtitle") }}</p>
      </div>
    </div>

    <div class="form-actions friendly-actions">
      <pv-button
        :label="t('subscriptions.backToPlans')"
        icon="pi pi-arrow-left"
        @click="router.push({ name: 'subscription-plans' })"
      />
    </div>
  </section>
</template>
