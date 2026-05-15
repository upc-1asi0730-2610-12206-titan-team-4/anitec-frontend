<script setup>
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import useLivestockStore from "../../../livestock/application/livestock.store.js";
import useSanitaryStore from "../../../sanitary/application/sanitary.store.js";

const {t} = useI18n();

const router = useRouter();

const livestock = useLivestockStore();

const sanitary = useSanitaryStore();

const selectedClientId = ref(null);

onMounted(async () => {
  if (!livestock.loaded) await livestock.fetchAnimals();
  if (!livestock.herds.length) await livestock.fetchHerds();
  if (!sanitary.loaded) await sanitary.fetchHealthEvents();

  if (assignedRanchers.value[0]) {
    selectedClientId.value = assignedRanchers.value[0].id;
  } else {
    selectedClientId.value = null;
  }
});

const assignedRanchers = computed(() => livestock.getAssignedRanchers());

const assignedAnimals = computed(() => livestock.getAnimalsByVeterinarianId());

/**
 * Gets animal identifiers under veterinarian supervision.
 */
const assignedAnimalIds = computed(() => {
  const ids = [];

  assignedAnimals.value.forEach(animal => {
    ids.push(Number(animal.id));
  });

  return ids;
});

/**
 * Filters health records for animals assigned to the veterinarian.
 */
const assignedHealthEvents = computed(() => {
  const healthEvents = [];

  sanitary.healthEvents.forEach(event => {
    if (assignedAnimalIds.value.includes(Number(event.animalId))) {
      healthEvents.push(event);
    }
  });

  return healthEvents;
});

/**
 * Groups patients that are not healthy.
 */
const activePatients = computed(() => {
  const patients = [];

  assignedAnimals.value.forEach(animal => {
    if (animal.status !== 'Saludable') {
      patients.push(animal);
    }
  });

  return patients;
});

const clinicalRecords = computed(() => assignedHealthEvents.value.length);

/**
 * Gets records that have a next follow-up date.
 */
const pendingFollowUps = computed(() => {
  const followUps = [];

  assignedHealthEvents.value.forEach(event => {
    if (event.nextDueDate) {
      followUps.push(event);
    }
  });

  return followUps;
});

/**
 * Sorts recent clinical records for the dashboard.
 */
const recentRecords = computed(() => {
  const records = assignedHealthEvents.value.slice();
  records.sort((firstRecord, secondRecord) => secondRecord.date.localeCompare(firstRecord.date));
  return records.slice(0, 5);
});

/**
 * Finds the selected client in the assigned ranchers list.
 */
const selectedClient = computed(() => {
  let clientFound = null;

  assignedRanchers.value.forEach(client => {
    if (Number(client.id) === Number(selectedClientId.value)) {
      clientFound = client;
    }
  });

  return clientFound;
});

const selectedClientHerds = computed(() => {
  if (selectedClientId.value) {
    return livestock.getHerdsByOwnerId(selectedClientId.value);
  }

  return [];
});

/**
 * Returns the animal name by its identifier.
 * @param {number|string} id Animal identifier.
 * @returns {string}
 */
const animalName = (id) => {
  let name = 'Animal';

  livestock.animals.forEach(animal => {
    if (Number(animal.id) === Number(id)) {
      name = animal.name;
    }
  });

  return name;
};

const herdForAnimal = (animalId) => {

  let animal = null;

  livestock.animals.forEach(item => {
    if (Number(item.id) === Number(animalId)) {
      animal = item;
    }
  });

  let herdId = null;
  if (animal) herdId = animal.herdId;

  let herd = null;

  livestock.herds.forEach(item => {
    if (Number(item.id) === Number(herdId)) {
      herd = item;
    }
  });

  if (herd) return `${herd.owner} / ${herd.name}`;
  return 'Cliente / hato';
};

const herdsByClient = (clientId) => livestock.getHerdsByOwnerId(clientId);

const animalsByClient = (clientId) => livestock.getAnimalsByOwnerId(clientId);

/**
 * Gets health records for a rancher client.
 * @param {number|string} clientId Client identifier.
 * @returns {Object[]}
 */
const healthEventsByClient = (clientId) => {
  const animalIds = [];

  animalsByClient(clientId).forEach(animal => {
    animalIds.push(Number(animal.id));
  });

  const clientEvents = [];

  sanitary.healthEvents.forEach(event => {
    if (animalIds.includes(Number(event.animalId))) {
      clientEvents.push(event);
    }
  });

  return clientEvents;
};

const alertsByClient = (clientId) => {
  let total = 0;

  healthEventsByClient(clientId).forEach(event => {
    if (event.nextDueDate) {
      total++;
    }
  });

  return total;
};

const herdNamesByClient = (clientId) => {
  const names = [];

  herdsByClient(clientId).forEach(herd => {
    names.push(herd.name);
  });

  if (names.length) {
    return names.join(', ');
  }

  return 'Sin fincas';
};

const selectedClientName = computed(() => {
  if (selectedClient.value) return selectedClient.value.fullName;
  return 'Escoge un ganadero';
});

const alertSeverity = (clientId) => {
  if (alertsByClient(clientId)) return 'warn';
  return 'success';
};
</script>

<template>
  <div class="dashboard">
    <section class="role-hero veterinarian-hero">
      <div>
        <span class="section-chip">Veterinary Workspace</span>
        <h2>{{ t('dashboards.veterinarianTitle') }}</h2>
        <p>{{ t('dashboards.veterinarianSubtitle') }}</p>
      </div>
      <div class="hero-actions">
        <pv-button label="Agregar cliente" icon="pi pi-user-plus" @click="router.push('/veterinary/add-client')"/>
        <pv-button :label="t('dashboards.scheduleVisit')" icon="pi pi-calendar-plus" @click="router.push('/activities/calendar/new')"/>
        <pv-button :label="t('dashboards.reviewRecords')" icon="pi pi-file-edit" severity="secondary" outlined @click="router.push('/sanitary/health-events')"/>
      </div>
    </section>

    <section class="panel veterinary-client-panel">
      <div class="panel-header">
        <div>
          <span class="section-chip">Seleccion de cliente</span>
          <h3>{{ selectedClientName }}</h3>
          <p>Primero selecciona al cliente ganadero para revisar sus fincas y pacientes.</p>
        </div>
        <div class="veterinary-selector-group">
          <pv-select v-model="selectedClientId" :options="assignedRanchers" option-label="fullName" option-value="id" placeholder="Selecciona cliente"/>
          <pv-button
            :label="t('veterinary.viewPatients')"
            icon="pi pi-id-card"
            :disabled="!selectedClientId"
            @click="router.push({path: '/veterinary/patients', query: {clientId: selectedClientId}})"
          />
        </div>
      </div>

      <div class="record-card-grid">
        <article v-for="herd in selectedClientHerds" :key="herd.id" class="record-card">
          <header>
            <div>
              <span>{{ herd.mainType }}</span>
              <h3>{{ herd.name }}</h3>
            </div>
            <strong>{{ livestock.getAnimalCountByHerd(herd.id) }} animales</strong>
          </header>
          <dl>
            <div><dt>{{ t('herds.location') }}</dt><dd>{{ herd.location }}</dd></div>
            <div><dt>{{ t('herds.owner') }}</dt><dd>{{ herd.owner }}</dd></div>
          </dl>
        </article>
      </div>

      <p v-if="selectedClient && !selectedClientHerds.length" class="empty-state">Este cliente aun no tiene fincas registradas.</p>
    </section>

    <section class="metric-grid">
      <article class="metric-card">
        <i class="pi pi-users"></i>
        <span>{{ t('dashboards.assignedRanchers') }}</span>
        <strong>{{ assignedRanchers.length }}</strong>
        <small>Clientes activos</small>
      </article>
      <article class="metric-card">
        <i class="pi pi-heart"></i>
        <span>{{ t('dashboards.activePatients') }}</span>
        <strong>{{ activePatients.length }}</strong>
        <small>Animales en seguimiento</small>
      </article>
      <article class="metric-card">
        <i class="pi pi-file-edit"></i>
        <span>{{ t('dashboards.clinicalRecords') }}</span>
        <strong>{{ clinicalRecords }}</strong>
        <small>Historiales sanitarios</small>
      </article>
      <article class="metric-card">
        <i class="pi pi-bell"></i>
        <span>{{ t('dashboards.pendingFollowUps') }}</span>
        <strong>{{ pendingFollowUps.length }}</strong>
        <small>Con proxima fecha</small>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <span class="section-chip">Clientes</span>
          <h3>{{ t('dashboards.clientOverview') }}</h3>
        </div>
      </div>
      <div class="dashboard-client-grid">
        <article v-for="client in assignedRanchers" :key="client.id" class="dashboard-client-card">
          <header>
            <div>
              <span>Ganadero</span>
              <h4>{{ client.fullName }}</h4>
            </div>
            <pv-tag :value="`${alertsByClient(client.id)} alertas`" :severity="alertSeverity(client.id)"/>
          </header>

          <dl>
            <div><dt>Fincas</dt><dd>{{ herdNamesByClient(client.id) }}</dd></div>
            <div><dt>Animales</dt><dd>{{ animalsByClient(client.id).length }} registrados</dd></div>
            <div><dt>Seguimientos</dt><dd>{{ alertsByClient(client.id) }} pendientes</dd></div>
          </dl>

          <footer>
            <pv-button
              label="Ver animales"
              icon="pi pi-id-card"
              outlined
              @click="router.push({path: '/veterinary/patients', query: {clientId: client.id}})"
            />
          </footer>
        </article>
      </div>
      <p v-if="!assignedRanchers.length" class="empty-state">No tienes clientes ganaderos asignados.</p>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <span class="section-chip">Historias clinicas</span>
          <h3>{{ t('dashboards.recentHealthEvents') }}</h3>
        </div>
        <router-link to="/sanitary/health-events">Gestion sanitaria</router-link>
      </div>
      <pv-data-table :value="recentRecords" striped-rows>
        <pv-column :header="t('health.date')" field="date"/>
        <pv-column :header="t('health.animal')">
          <template #body="slotProps">{{ animalName(slotProps.data.animalId) }}</template>
        </pv-column>
        <pv-column header="Ganadero / hato">
          <template #body="slotProps">{{ herdForAnimal(slotProps.data.animalId) }}</template>
        </pv-column>
        <pv-column :header="t('health.type')" field="type"/>
        <pv-column :header="t('health.description')" field="description"/>
        <pv-column :header="t('health.nextDueDate')" field="nextDueDate"/>
      </pv-data-table>
    </section>
  </div>
</template>
