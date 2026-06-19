<script setup>
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useLivestockStore from "../../../livestock/application/livestock.store.js";
import useSanitaryStore from "../../../sanitary/application/sanitary.store.js";
import useFinancialStore from "../../../financial/application/financial.store.js";
import useActivitiesStore from "../../../activities/application/activities.store.js";

const { t } = useI18n();

const router = useRouter();

const livestock = useLivestockStore();

const sanitary = useSanitaryStore();

const financial = useFinancialStore();

const activities = useActivitiesStore();

onMounted(() => {
  if (!livestock.loaded) livestock.fetchAnimals();
  if (!sanitary.loaded) sanitary.fetchHealthEvents();
  if (!financial.loaded) financial.fetchRecords();
  if (!activities.loaded) activities.fetchActivities();
});

const animalSeverity = (status) => {
  if (status === "Saludable") return "success";
  return "warn";
};

const activitySeverity = (priority) => {
  if (priority === "Alta") return "danger";
  return "info";
};

const recentAnimals = computed(() => {
  const list = [];

  livestock.animals.forEach((animal) => {
    if (list.length < 4) {
      list.push(animal);
    }
  });

  return list;
});

const recentActivities = computed(() => {
  const list = [];

  activities.activities.forEach((activity) => {
    if (list.length < 4) {
      list.push(activity);
    }
  });

  return list;
});
</script>

<template>
  <div class="dashboard">
    <section class="hero-panel">
      <div>
        <span class="section-chip">{{ t("home.chip") }}</span>
        <h2>{{ t("home.title") }}</h2>
        <p>{{ t("home.content") }}</p>
      </div>
      <div class="hero-actions">
        <pv-button
          :label="t('home.primaryAction')"
          icon="pi pi-plus"
          @click="router.push('/livestock/animals/new')"
        />
        <pv-button
          :label="t('home.secondaryAction')"
          icon="pi pi-chart-line"
          severity="secondary"
          outlined
          @click="router.push('/analytics/dashboard')"
        />
      </div>
    </section>

    <section class="metric-grid">
      <article class="metric-card">
        <i class="pi pi-id-card"></i>
        <span>{{ t("home.animals") }}</span>
        <strong>{{ livestock.animalCount }}</strong>
        <small>{{ livestock.healthyCount }} {{ t("home.healthy") }}</small>
      </article>
      <article class="metric-card">
        <i class="pi pi-heart"></i>
        <span>{{ t("home.healthAlerts") }}</span>
        <strong>{{ sanitary.pendingAlerts }}</strong>
        <small>{{ t("home.activeFollowUps") }}</small>
      </article>
      <article class="metric-card">
        <i class="pi pi-wallet"></i>
        <span>{{ t("home.monthlyBalance") }}</span>
        <strong>S/ {{ financial.balance }}</strong>
        <small>{{ t("home.incomeMinusExpenses") }}</small>
      </article>
      <article class="metric-card">
        <i class="pi pi-calendar"></i>
        <span>{{ t("home.highPriority") }}</span>
        <strong>{{ activities.highPriorityCount }}</strong>
        <small>{{ t("home.upcomingActivities") }}</small>
      </article>
    </section>

    <section class="split-grid">
      <article class="panel">
        <div class="panel-header">
          <h3>{{ t("home.recentAnimals") }}</h3>
          <router-link to="/livestock/animals">{{ t("home.viewAll") }}</router-link>
        </div>
        <div class="compact-list">
          <div
            v-for="animal in recentAnimals"
            :key="animal.id"
            class="compact-row"
          >
            <span>{{ animal.tag }}</span>
            <strong>{{ animal.name }}</strong>
            <pv-tag
              :value="animal.status"
              :severity="animalSeverity(animal.status)"
            />
          </div>
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <h3>{{ t("home.upcomingActivities") }}</h3>
          <router-link to="/activities/calendar">{{ t("home.openCalendar") }}</router-link>
        </div>
        <div class="compact-list">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="compact-row"
          >
            <span>{{ activity.date }}</span>
            <strong>{{ activity.title }}</strong>
            <pv-tag
              :value="activity.priority"
              :severity="activitySeverity(activity.priority)"
            />
          </div>
        </div>
      </article>
    </section>
  </div>
</template>
