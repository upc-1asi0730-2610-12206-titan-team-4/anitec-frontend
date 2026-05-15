<script setup>
import {computed, onMounted} from "vue";
import {useI18n} from "vue-i18n";
import useSanitaryStore from "../../../sanitary/application/sanitary.store.js";
import useLivestockStore from "../../../livestock/application/livestock.store.js";
import useIamStore from "../../../iam/application/iam.store.js";

const {t} = useI18n();

const sanitary = useSanitaryStore();

const livestock = useLivestockStore();

const iam = useIamStore();

onMounted(() => {
  if (!sanitary.loaded) sanitary.fetchHealthEvents();
  if (!livestock.loaded) livestock.fetchAnimals();
  if (!livestock.herds.length) livestock.fetchHerds();
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#1e2520',
        usePointStyle: true,
        boxWidth: 8
      }
    }
  },
  scales: {
    x: {
      ticks: {color: '#657069'},
      grid: {color: '#eee5d8'}
    },
    y: {
      ticks: {color: '#657069'},
      grid: {color: '#eee5d8'}
    }
  }
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '62%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#1e2520',
        usePointStyle: true,
        boxWidth: 8
      }
    }
  }
};

const colors = ['#79b267', '#925930', '#a3c4a8', '#d1bfa5', '#6f3f22', '#4f8f45', '#ca8a04', '#4b6f44'];

const assignedRanchers = computed(() => livestock.getAssignedRanchers());

const rancherHerds = computed(() => {
  return livestock.getHerdsByOwnerId(iam.currentUserId);
});

const veterinarianHerds = computed(() => {
  return livestock.getHerdsByVeterinarianId(iam.currentUserId);
});

/**
 * Gets the herds that analytics should use based on the role.
 */
const visibleHerds = computed(() => {
  if (iam.currentRole === 'rancher') return rancherHerds.value;
  if (iam.currentRole === 'veterinarian') return veterinarianHerds.value;
  return [];
});

const rancherAnimals = computed(() => {
  return livestock.getAnimalsByOwnerId(iam.currentUserId);
});

const veterinarianAnimals = computed(() => {
  return livestock.getAnimalsByVeterinarianId(iam.currentUserId);
});

/**
 * Gets the visible animals used to calculate metrics and charts.
 */
const visibleAnimals = computed(() => {
  if (iam.currentRole === 'rancher') return rancherAnimals.value;
  if (iam.currentRole === 'veterinarian') return veterinarianAnimals.value;
  return [];
});

const visibleAnimalIds = computed(() => {
  const ids = [];

  visibleAnimals.value.forEach(animal => {
    ids.push(Number(animal.id));
  });

  return ids;
});

/**
 * Filters health records related to the visible animals.
 */
const visibleHealthEvents = computed(() => {
  const healthEvents = [];

  sanitary.healthEvents.forEach(event => {
    if (visibleAnimalIds.value.includes(Number(event.animalId))) {
      healthEvents.push(event);
    }
  });

  return healthEvents;
});

const pendingHealthEvents = computed(() => {
  const healthEvents = [];

  visibleHealthEvents.value.forEach(event => {
    if (event.nextDueDate) {
      healthEvents.push(event);
    }
  });

  return healthEvents;
});

/**
 * Groups animals that need attention because they are not healthy.
 */
const activePatients = computed(() => {
  const animals = [];

  visibleAnimals.value.forEach(animal => {
    if (animal.status !== 'Saludable') {
      animals.push(animal);
    }
  });

  return animals;
});

const healthyAnimals = computed(() => {
  const animals = [];

  visibleAnimals.value.forEach(animal => {
    if (animal.status === 'Saludable') {
      animals.push(animal);
    }
  });

  return animals;
});

const observationAnimals = computed(() => {
  const animals = [];

  visibleAnimals.value.forEach(animal => {
    if (animal.status === 'Observacion') {
      animals.push(animal);
    }
  });

  return animals;
});

const treatmentAnimals = computed(() => {
  const animals = [];

  visibleAnimals.value.forEach(animal => {
    if (animal.status === 'En tratamiento') {
      animals.push(animal);
    }
  });

  return animals;
});

const incidenceHealthEvents = computed(() => {
  const healthEvents = [];

  visibleHealthEvents.value.forEach(event => {
    if (event.type === 'Incidencia') {
      healthEvents.push(event);
    }
  });

  return healthEvents;
});

const vaccineHealthEvents = computed(() => {
  const healthEvents = [];

  visibleHealthEvents.value.forEach(event => {
    if (event.type === 'Vacuna') {
      healthEvents.push(event);
    }
  });

  return healthEvents;
});

const revisionHealthEvents = computed(() => {
  const healthEvents = [];

  visibleHealthEvents.value.forEach(event => {
    if (event.type === 'Revision') {
      healthEvents.push(event);
    }
  });

  return healthEvents;
});

const treatmentHealthEvents = computed(() => {
  const healthEvents = [];

  visibleHealthEvents.value.forEach(event => {
    if (event.type === 'Tratamiento') {
      healthEvents.push(event);
    }
  });

  return healthEvents;
});

const diagnosisHealthEvents = computed(() => {
  const healthEvents = [];

  visibleHealthEvents.value.forEach(event => {
    if (event.type === 'Diagnostico') {
      healthEvents.push(event);
    }
  });

  return healthEvents;
});

const otherHealthEvents = computed(() => {
  const healthEvents = [];

  visibleHealthEvents.value.forEach(event => {
    let isOther = true;

    if (event.type === 'Incidencia') isOther = false;
    if (event.type === 'Vacuna') isOther = false;
    if (event.type === 'Revision') isOther = false;
    if (event.type === 'Tratamiento') isOther = false;
    if (event.type === 'Diagnostico') isOther = false;

    if (isOther) {
      healthEvents.push(event);
    }
  });

  return healthEvents;
});

/**
 * Builds the main analytics cards based on the user role.
 */
const analyticsMetrics = computed(() => {
  if (iam.currentRole === 'veterinarian') {
    return [
      {id: 'clients', label: 'Clientes asignados', value: assignedRanchers.value.length, trend: `${visibleHerds.value.length} fincas bajo seguimiento`},
      {id: 'patients', label: 'Pacientes monitoreados', value: visibleAnimals.value.length, trend: `${activePatients.value.length} requieren atencion`},
      {id: 'records', label: 'Registros sanitarios', value: visibleHealthEvents.value.length, trend: `${pendingHealthEvents.value.length} seguimientos pendientes`}
    ];
  }

  return [
    {id: 'animals', label: 'Animales registrados', value: visibleAnimals.value.length, trend: `${visibleHerds.value.length} fincas activas`},
    {id: 'alerts', label: 'Alertas sanitarias', value: pendingHealthEvents.value.length, trend: `${activePatients.value.length} animales en observacion`},
    {id: 'records', label: 'Registros sanitarios', value: visibleHealthEvents.value.length, trend: 'Historial del hato'}
  ];
});

/**
 * Prepares data for the herd health status chart.
 */
const animalStatusData = computed(() => {
  return {
    labels: ['Saludable', 'Observacion', 'En tratamiento'],
    datasets: [
      {
        data: [
          healthyAnimals.value.length,
          observationAnimals.value.length,
          treatmentAnimals.value.length
        ],
        backgroundColor: ['#79b267', '#d1bfa5', '#925930'],
        borderColor: '#fffaf2',
        borderWidth: 3
      }
    ]
  };
});

/**
 * Prepares data for the health records by type chart.
 */
const healthEventTypeData = computed(() => {
  return {
    labels: ['Incidencia', 'Vacuna', 'Revision', 'Tratamiento', 'Diagnostico', 'Otros'],
    datasets: [
      {
        label: 'Registros',
        data: [
          incidenceHealthEvents.value.length,
          vaccineHealthEvents.value.length,
          revisionHealthEvents.value.length,
          treatmentHealthEvents.value.length,
          diagnosisHealthEvents.value.length,
          otherHealthEvents.value.length
        ],
        backgroundColor: colors,
        borderRadius: 8
      }
    ]
  };
});

/**
 * Calculates how many health visits each visible herd has.
 */
const herdSanitaryData = computed(() => {
  const labels = [];
  const values = [];

  visibleHerds.value.forEach(herd => {
    let total = 0;

    visibleAnimals.value.forEach(animal => {
      if (Number(animal.herdId) === Number(herd.id)) {
        visibleHealthEvents.value.forEach(event => {
          if (Number(event.animalId) === Number(animal.id)) {
            total++;
          }
        });
      }
    });

    labels.push(herd.name);
    values.push(total);
  });

  let chartLabels = ['Sin datos'];
  if (labels.length) chartLabels = labels;

  let chartValues = [0];
  if (values.length) chartValues = values;

  return {
    labels: chartLabels,
    datasets: [
      {
        label: 'Atenciones sanitarias',
        data: chartValues,
        borderColor: '#79b267',
        backgroundColor: 'rgba(121, 178, 103, 0.18)',
        fill: true,
        tension: 0.35
      }
    ]
  };
});
</script>

<template>
  <div class="dashboard">
    <section class="panel">
      <div class="panel-header">
        <div>
          <span class="section-chip">Analytics BC</span>
          <h2>{{ t('analytics.title') }}</h2>
          <p>{{ t('analytics.subtitle') }}</p>
        </div>
      </div>
      <section class="metric-grid">
        <article v-for="metric in analyticsMetrics" :key="metric.id" class="metric-card">
          <span>{{ metric.label }}</span>
          <strong>{{ metric.value }}</strong>
          <small>{{ metric.trend }}</small>
        </article>
      </section>
    </section>

    <section v-if="iam.currentRole === 'rancher'" class="chart-grid">
      <article class="panel chart-panel">
        <div class="panel-header">
          <div>
            <span class="section-chip">Produccion</span>
            <h3>Estado del hato</h3>
          </div>
        </div>
        <pv-chart type="doughnut" :data="animalStatusData" :options="doughnutOptions"/>
      </article>
      <article class="panel chart-panel">
        <div class="panel-header">
          <div>
            <span class="section-chip">Sanidad</span>
            <h3>Registros por tipo</h3>
          </div>
        </div>
        <pv-chart type="bar" :data="healthEventTypeData" :options="chartOptions"/>
      </article>
    </section>

    <section v-if="iam.currentRole === 'veterinarian'" class="chart-grid">
      <article class="panel chart-panel">
        <div class="panel-header">
          <div>
            <span class="section-chip">Sanidad</span>
            <h3>Registros por tipo</h3>
          </div>
        </div>
        <pv-chart type="bar" :data="healthEventTypeData" :options="chartOptions"/>
      </article>
      <article class="panel chart-panel">
        <div class="panel-header">
          <div>
            <span class="section-chip">Clientes</span>
            <h3>Atenciones por hato</h3>
          </div>
        </div>
        <pv-chart type="line" :data="herdSanitaryData" :options="chartOptions"/>
      </article>
    </section>
  </div>
</template>
