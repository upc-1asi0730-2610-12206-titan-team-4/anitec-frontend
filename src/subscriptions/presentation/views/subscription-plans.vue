<script setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import useIamStore from "../../../iam/application/iam.store.js";
import useSubscriptionsStore from "../../application/subscriptions.store.js";

const { t } = useI18n();

const iam = useIamStore();

const subscriptions = useSubscriptionsStore();

onMounted(async () => {
  await subscriptions.fetchPlans();
  await subscriptions.fetchActiveSubscription(iam.currentUserId);
  await subscriptions.fetchPayments(iam.currentUserId);
});

const isCurrentPlan = (plan) => {
  if (!subscriptions.activeSubscription) return false;
  return Number(subscriptions.activeSubscription.planId) === Number(plan.id);
};

const activePlanName = () => {
  if (subscriptions.activePlan) return subscriptions.activePlan.name;
  return t("subscriptions.noPlan");
};

const checkout = async (plan) => {
  await subscriptions.checkout(iam.currentUserId, plan);
};
</script>

<template>
  <div class="dashboard">
    <section class="panel">
      <div class="panel-header">
        <div>
          <span class="section-chip">Payments BC</span>
          <h2>{{ t("subscriptions.title") }}</h2>
          <p>{{ t("subscriptions.subtitle") }}</p>
        </div>
      </div>

      <section class="metric-grid compact">
        <article class="metric-card">
          <i class="pi pi-credit-card"></i>
          <span>{{ t("subscriptions.activeSubscription") }}</span>
          <strong>{{ activePlanName() }}</strong>
          <small>{{ t("subscriptions.currentStatus") }}</small>
        </article>
        <article class="metric-card">
          <i class="pi pi-receipt"></i>
          <span>{{ t("subscriptions.registeredPayments") }}</span>
          <strong>{{ subscriptions.payments.length }}</strong>
          <small>{{ t("subscriptions.testHistory") }}</small>
        </article>
        <article class="metric-card">
          <i class="pi pi-list-check"></i>
          <span>{{ t("subscriptions.availablePlans") }}</span>
          <strong>{{ subscriptions.plans.length }}</strong>
          <small>{{ t("subscriptions.configuredInBackend") }}</small>
        </article>
      </section>
    </section>

    <p v-if="subscriptions.loading" class="empty-state">
      {{ t("subscriptions.loading") }}
    </p>

    <p v-if="subscriptions.errors.length" class="empty-state">
      {{ t("subscriptions.connectionError") }}
    </p>

    <section class="record-card-grid">
      <article v-for="plan in subscriptions.plans" :key="plan.id" class="panel">
        <div class="panel-header">
          <div>
            <span class="section-chip">{{ t("subscriptions.plan") }}</span>
            <h2>{{ plan.name }}</h2>
            <p>{{ t("subscriptions.maxAnimals", { count: plan.maxAnimals }) }}</p>
          </div>
          <pv-tag
            v-if="isCurrentPlan(plan)"
            :value="t('subscriptions.active')"
            severity="success"
          />
        </div>
        <div class="metric-card">
          <span>{{ t("subscriptions.monthlyPrice") }}</span>
          <strong>S/ {{ Number(plan.price).toFixed(2) }}</strong>
          <small>{{ plan.stripePriceId }}</small>
        </div>
        <div class="form-actions" style="margin-top: 14px">
          <pv-button
            :label="
              isCurrentPlan(plan)
                ? t('subscriptions.currentPlan')
                : t('subscriptions.testPay')
            "
            icon="pi pi-wallet"
            :disabled="isCurrentPlan(plan)"
            @click="checkout(plan)"
          />
        </div>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <span class="section-chip">{{ t("subscriptions.history") }}</span>
          <h2>{{ t("subscriptions.testPayments") }}</h2>
        </div>
      </div>
      <div class="timeline-list">
        <article
          v-for="payment in subscriptions.payments"
          :key="payment.id"
          class="timeline-item"
        >
          <time>{{ new Date(payment.paidAt).toLocaleDateString() }}</time>
          <div>
            <strong>{{ payment.provider }}</strong>
            <span>{{ payment.providerPaymentId }}</span>
          </div>
          <strong>S/ {{ Number(payment.amount).toFixed(2) }}</strong>
          <pv-tag :value="payment.status" severity="success" />
        </article>
      </div>
      <p v-if="!subscriptions.payments.length" class="empty-state">
        {{ t("subscriptions.emptyPayments") }}
      </p>
    </section>
  </div>
</template>
