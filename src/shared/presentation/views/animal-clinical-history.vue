<script setup>
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import useLivestockStore from "../../../livestock/application/livestock.store.js";
import useSanitaryStore from "../../../sanitary/application/sanitary.store.js";

const { t } = useI18n();

const route = useRoute();

const router = useRouter();

const livestock = useLivestockStore();

const sanitary = useSanitaryStore();

onMounted(() => {
  if (!livestock.loaded) livestock.fetchAnimals();
  if (!livestock.herds.length) livestock.fetchHerds();
  if (!sanitary.loaded) sanitary.fetchHealthEvents();
});

const animal = computed(() => livestock.getAnimalById(route.params.id));

/**
 * Gets the selected animal's health history.
 */
const records = computed(() => {
  const animalRecords = [];

  sanitary.healthEvents.forEach((event) => {
    if (Number(event.animalId) === Number(route.params.id)) {
      animalRecords.push(event);
    }
  });

  return animalRecords;
});

const herdName = computed(() => {
  if (animal.value) {
    return livestock.getHerdName(animal.value.herdId);
  }

  return "Sin hato";
});

/**
 * Returns the text status of a clinical record.
 * @param {Object} record Health record.
 * @returns {string}
 */
const recordLabel = (record) => {
  if (record.nextDueDate) return "Seguimiento";
  return "Cerrado";
};

const recordSeverity = (record) => {
  if (record.nextDueDate) return "warn";
  return "success";
};

/**
 * Shows fallback text for pending clinical fields.
 * @param {string} value Original value.
 * @returns {string}
 */
const pendingText = (value) => {
  if (value) return value;
  return "Pendiente";
};

const followUpText = (value) => {
  if (value) return value;
  return "Sin seguimiento registrado";
};
</script>

<template>
  <div class="dashboard">
    <section class="role-hero veterinarian-hero">
      <div>
        <span class="section-chip">Clinical Record</span>
        <h2>{{ t("veterinary.clinicalHistoryTitle") }}</h2>
        <p>{{ t("veterinary.clinicalHistorySubtitle") }}</p>
      </div>
      <pv-button
        :label="t('health.new')"
        icon="pi pi-plus"
        @click="router.push('/sanitary/health-events/new')"
      />
    </section>

    <section v-if="animal" class="metric-grid compact">
      <article class="metric-card">
        <span>{{ t("animals.name") }}</span
        ><strong>{{ animal.name }}</strong
        ><small>{{ animal.tag }}</small>
      </article>
      <article class="metric-card">
        <span>{{ t("animals.herd") }}</span
        ><strong>{{ herdName }}</strong
        ><small>{{ animal.species }} - {{ animal.breed }}</small>
      </article>
      <article class="metric-card">
        <span>{{ t("animals.status") }}</span
        ><strong>{{ animal.status }}</strong
        ><small>{{ animal.weight }} kg</small>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <span class="section-chip">Sanitary BC</span>
          <h3>{{ t("dashboards.recentHealthEvents") }}</h3>
        </div>
      </div>
      <div class="clinical-record-list">
        <article
          v-for="record in records"
          :key="record.id"
          class="clinical-record-card"
        >
          <header>
            <div>
              <strong>{{ record.type }}</strong>
              <span>{{ record.date }} - {{ record.veterinarian }}</span>
            </div>
            <pv-tag
              :value="recordLabel(record)"
              :severity="recordSeverity(record)"
            />
          </header>
          <p>
            <b>{{ t("health.description") }}:</b> {{ record.description }}
          </p>
          <p>
            <b>{{ t("health.diagnosis") }}:</b>
            {{ pendingText(record.diagnosis) }}
          </p>
          <p>
            <b>{{ t("health.treatment") }}:</b>
            {{ pendingText(record.treatment) }}
          </p>
          <p>
            <b>{{ t("health.prescription") }}:</b>
            {{ pendingText(record.prescription) }}
          </p>
          <p>
            <b>{{ t("health.followUp") }}:</b>
            {{ followUpText(record.followUp) }}
          </p>
        </article>
      </div>
      <p v-if="!records.length" class="empty-state">
        Este animal aun no tiene registros sanitarios.
      </p>
    </section>
  </div>
</template>
