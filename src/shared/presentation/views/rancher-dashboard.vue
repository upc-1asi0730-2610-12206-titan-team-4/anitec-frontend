<script setup>
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import useLivestockStore from "../../../livestock/application/livestock.store.js";
import useSanitaryStore from "../../../sanitary/application/sanitary.store.js";
import useFinancialStore from "../../../financial/application/financial.store.js";
import useActivitiesStore from "../../../activities/application/activities.store.js";
import useIamStore from "../../../iam/application/iam.store.js";

const {t} = useI18n();

const router = useRouter();

const livestock = useLivestockStore();

const sanitary = useSanitaryStore();

const financial = useFinancialStore();

const activities = useActivitiesStore();

const iam = useIamStore();

const selectedHerdId = ref('all');

onMounted(() => {
  if (!livestock.loaded) livestock.fetchAnimals();
  if (!livestock.herds.length) livestock.fetchHerds();
  if (!sanitary.loaded) sanitary.fetchHealthEvents();
  if (!financial.loaded) financial.fetchRecords();
  if (!activities.loaded) activities.fetchActivities();
});

/**
 * Builds farm options to filter the rancher dashboard.
 */
const herdOptions = computed(() => {
  const options = [{id: 'all', name: t('herds.all')}];

  livestock.getHerdsByOwnerId(iam.currentUserId).forEach(herd => {
    options.push(herd);
  });

  return options;
});

const rancherHerds = computed(() => livestock.getHerdsByOwnerId(iam.currentUserId));

const rancherHerd = computed(() => {
  let selectedHerd = null;

  rancherHerds.value.forEach(herd => {
    if (Number(herd.id) === Number(selectedHerdId.value)) {
      selectedHerd = herd;
    }
  });

  return selectedHerd;
});

/**
 * Gets the rancher's animals, filtered by farm when one is selected.
 */
const rancherAnimals = computed(() => {
  if (selectedHerdId.value === 'all') return livestock.getAnimalsByOwnerId(iam.currentUserId);

  const animals = [];

  livestock.animals.forEach(animal => {
    if (Number(animal.herdId) === Number(selectedHerdId.value)) {
      animals.push(animal);
    }
  });

  return animals;
});

/**
 * Groups animals that need health follow-up.
 */
const animalsAtRisk = computed(() => {
  const animals = [];

  rancherAnimals.value.forEach(animal => {
    if (animal.status !== 'Saludable') {
      animals.push(animal);
    }
  });

  return animals;
});

/**
 * Gets health records related to the rancher's animals.
 */
const rancherHealthEvents = computed(() => {
  const healthEvents = [];

  sanitary.healthEvents.forEach(event => {
    rancherAnimals.value.forEach(animal => {
      if (Number(animal.id) === Number(event.animalId)) {
        healthEvents.push(event);
      }
    });
  });

  return healthEvents;
});

/**
 * Sorts and shows upcoming calendar activities.
 */
const upcomingActivities = computed(() => {
  const list = activities.activities.slice();
  list.sort((firstActivity, secondActivity) => firstActivity.date.localeCompare(secondActivity.date));
  return list.slice(0, 4);
});

/**
 * Sorts and shows the most recent health visits.
 */
const recentHealthEvents = computed(() => {
  const list = rancherHealthEvents.value.slice();
  list.sort((firstEvent, secondEvent) => secondEvent.date.localeCompare(firstEvent.date));
  return list.slice(0, 4);
});

const animalName = (id) => {
  let name = 'Animal';

  livestock.animals.forEach(animal => {
    if (Number(animal.id) === Number(id)) {
      name = animal.name;
    }
  });

  return name;
};

const selectedHerdName = computed(() => {
  if (selectedHerdId.value === 'all') return t('herds.all');
  if (rancherHerd.value) return rancherHerd.value.name;
  return '';
});

const healthEventLabel = (event) => {
  if (event.nextDueDate) return 'Seguimiento';
  return 'Cerrado';
};

const healthEventSeverity = (event) => {
  if (event.nextDueDate) return 'warn';
  return 'success';
};

const activitySeverity = (priority) => {
  if (priority === 'Alta') return 'danger';
  return 'info';
};

const animalSeverity = (status) => {
  if (status === 'Saludable') return 'success';
  return 'warn';
};
</script>

<template>
  <div class="dashboard">
    <section class="role-hero rancher-hero">
      <div>
        <span class="section-chip">Rancher Workspace</span>
        <h2>{{ t('dashboards.rancherTitle') }}</h2>
        <p>{{ t('dashboards.rancherSubtitle') }}</p>
      </div>
      <div class="hero-actions">
        <pv-button :label="t('dashboards.registerAnimal')" icon="pi pi-plus" @click="router.push('/livestock/animals/new')"/>
        <pv-button :label="t('dashboards.recordHealthIssue')" icon="pi pi-heart" severity="secondary" outlined @click="router.push('/sanitary/health-events/new')"/>
        <pv-button :label="t('dashboards.scheduleVisit')" icon="pi pi-calendar-plus" severity="secondary" outlined @click="router.push('/activities/calendar/new')"/>
      </div>
    </section>

    <section class="panel herd-control-panel">
      <div>
        <span class="section-chip">{{ t('herds.myFarms') }}</span>
        <h3>{{ t('herds.title') }}</h3>
      </div>
      <div class="herd-control-actions">
        <pv-select v-model="selectedHerdId" :options="herdOptions" option-label="name" option-value="id"/>
        <pv-button :label="t('herds.new')" icon="pi pi-plus" @click="router.push('/livestock/herds/new')"/>
      </div>
    </section>

    <section class="metric-grid">
      <article class="metric-card">
        <i class="pi pi-warehouse"></i>
        <span>{{ t('herds.animalsInSelection') }}</span>
        <strong>{{ rancherAnimals.length }}</strong>
        <small>{{ selectedHerdName }}</small>
      </article>
      <article class="metric-card">
        <i class="pi pi-exclamation-triangle"></i>
        <span>{{ t('dashboards.animalsAtRisk') }}</span>
        <strong>{{ animalsAtRisk.length }}</strong>
        <small>Observacion o tratamiento</small>
      </article>
      <article class="metric-card">
        <i class="pi pi-wallet"></i>
        <span>{{ t('dashboards.monthlyBalance') }}</span>
        <strong>S/ {{ financial.balance }}</strong>
        <small>Ingresos: S/ {{ financial.incomeTotal }}</small>
      </article>
      <article class="metric-card">
        <i class="pi pi-calendar-clock"></i>
        <span>{{ t('dashboards.upcomingTasks') }}</span>
        <strong>{{ upcomingActivities.length }}</strong>
        <small>Próximas actividades</small>
      </article>
    </section>

    <section class="split-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <span class="section-chip">Sanidad</span>
            <h3>{{ t('dashboards.healthAlerts') }}</h3>
          </div>
          <router-link to="/sanitary/health-events">Ver sanidad</router-link>
        </div>
        <div class="compact-list">
          <div v-for="event in recentHealthEvents" :key="event.id" class="compact-row">
            <span>{{ event.date }}</span>
            <strong>{{ animalName(event.animalId) }} - {{ event.type }}</strong>
            <pv-tag :value="healthEventLabel(event)" :severity="healthEventSeverity(event)"/>
          </div>
        </div>
        <p v-if="!recentHealthEvents.length" class="empty-state">No hay atenciones sanitarias registradas para este hato.</p>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <span class="section-chip">Calendario</span>
            <h3>{{ t('dashboards.upcomingTasks') }}</h3>
          </div>
          <router-link to="/activities/calendar">Abrir calendario</router-link>
        </div>
        <div class="timeline-list small">
          <article v-for="activity in upcomingActivities" :key="activity.id" class="timeline-item">
            <time>{{ activity.date }}</time>
            <div>
              <strong>{{ activity.title }}</strong>
              <span>{{ activity.type }} - {{ activity.status }}</span>
            </div>
            <pv-tag :value="activity.priority" :severity="activitySeverity(activity.priority)"/>
          </article>
        </div>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <span class="section-chip">Inventario animal</span>
          <h3>{{ selectedHerdName }}</h3>
        </div>
        <router-link to="/livestock/animals">Gestionar animales</router-link>
      </div>
      <div class="animal-card-grid">
        <article v-for="animal in rancherAnimals" :key="animal.id" class="animal-card">
          <span>{{ animal.tag }}</span>
          <strong>{{ animal.name }}</strong>
          <small>{{ animal.species }} - {{ animal.breed }} - {{ animal.weight }} kg</small>
          <pv-tag :value="animal.status" :severity="animalSeverity(animal.status)"/>
        </article>
      </div>
    </section>
  </div>
</template>
