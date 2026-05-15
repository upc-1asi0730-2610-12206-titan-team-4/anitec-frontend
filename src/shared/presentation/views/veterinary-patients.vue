<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import useLivestockStore from "../../../livestock/application/livestock.store.js";

const { t } = useI18n();

const route = useRoute();

const router = useRouter();

const livestock = useLivestockStore();

const selectedClientId = ref(null);

const selectedHerdId = ref(null);

onMounted(async () => {
  if (!livestock.herds.length) await livestock.fetchHerds();
  if (!livestock.loaded) await livestock.fetchAnimals();

  if (route.query.clientId) {
    selectedClientId.value = Number(route.query.clientId);
  } else if (assignedClients.value[0]) {
    selectedClientId.value = assignedClients.value[0].id;
  } else {
    selectedClientId.value = null;
  }

  selectedHerdId.value = "all";
});

const assignedClients = computed(() => livestock.getAssignedRanchers());

/**
 * Finds the client selected by the veterinarian in the filter.
 */
const selectedClient = computed(() => {
  let clientFound = null;

  assignedClients.value.forEach((client) => {
    if (Number(client.id) === Number(selectedClientId.value)) {
      clientFound = client;
    }
  });

  return clientFound;
});

const clientHerds = computed(() => {
  if (selectedClientId.value) {
    return livestock.getHerdsByOwnerId(selectedClientId.value);
  }

  return [];
});

/**
 * Builds farm options for the selected client.
 */
const herdOptions = computed(() => {
  const options = [];

  options.push({ id: "all", name: "Todas las fincas" });

  clientHerds.value.forEach((herd) => {
    options.push(herd);
  });

  return options;
});

/**
 * Filters patients by client and farm.
 */
const filteredAnimals = computed(() => {
  if (!selectedClientId.value) return [];
  if (selectedHerdId.value === "all")
    return livestock.getAnimalsByOwnerId(selectedClientId.value);

  const animals = [];

  livestock.animals.forEach((animal) => {
    if (Number(animal.herdId) === Number(selectedHerdId.value)) {
      animals.push(animal);
    }
  });

  return animals;
});

/**
 * Resets the farm filter when the client changes.
 */
const selectClient = () => {
  selectedHerdId.value = "all";
};

const animalSeverity = (status) => {
  if (status === "Saludable") return "success";
  return "warn";
};

const birthDateText = (birthDate) => {
  if (birthDate) {
    return birthDate;
  }

  return "Sin fecha";
};
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <div>
        <span class="section-chip">Veterinary Workspace</span>
        <h2>{{ t("veterinary.patientsTitle") }}</h2>
        <p>{{ t("veterinary.patientsSubtitle") }}</p>
      </div>
      <div class="veterinary-selector-group">
        <pv-select
          v-model="selectedClientId"
          :options="assignedClients"
          option-label="fullName"
          option-value="id"
          placeholder="Selecciona cliente"
          @change="selectClient"
        />
        <pv-select
          v-model="selectedHerdId"
          :options="herdOptions"
          option-label="name"
          option-value="id"
          placeholder="Selecciona finca"
        />
      </div>
    </div>

    <section v-if="selectedClient" class="client-context-panel">
      <div>
        <span class="section-chip">Cliente seleccionado</span>
        <h3>{{ selectedClient.fullName }}</h3>
      </div>
      <div class="client-stats">
        <span>{{ clientHerds.length }} fincas</span>
        <span>{{ filteredAnimals.length }} animales en vista</span>
      </div>
    </section>

    <div class="record-card-grid patient-card-grid">
      <article
        v-for="animal in filteredAnimals"
        :key="animal.id"
        class="record-card patient-card"
      >
        <header>
          <div>
            <span>{{ animal.tag }}</span>
            <h3>{{ animal.name }}</h3>
          </div>
          <pv-tag
            :value="animal.status"
            :severity="animalSeverity(animal.status)"
          />
        </header>

        <dl>
          <div>
            <dt>{{ t("animals.species") }}</dt>
            <dd>{{ animal.species }}</dd>
          </div>
          <div>
            <dt>{{ t("animals.breed") }}</dt>
            <dd>{{ animal.breed }}</dd>
          </div>
          <div>
            <dt>{{ t("animals.gender") }}</dt>
            <dd>{{ animal.gender }}</dd>
          </div>
          <div>
            <dt>{{ t("animals.birthDate") }}</dt>
            <dd>{{ birthDateText(animal.birthDate) }}</dd>
          </div>
          <div>
            <dt>{{ t("animals.weight") }}</dt>
            <dd>{{ animal.weight }} kg</dd>
          </div>
          <div>
            <dt>{{ t("veterinary.herd") }}</dt>
            <dd>{{ livestock.getHerdName(animal.herdId) }}</dd>
          </div>
        </dl>

        <footer>
          <pv-button
            :label="t('veterinary.viewHistory')"
            icon="pi pi-file-edit"
            outlined
            @click="
              router.push({
                name: 'animal-clinical-history',
                params: { id: animal.id },
              })
            "
          />
        </footer>
      </article>
    </div>

    <p v-if="selectedClient && !filteredAnimals.length" class="empty-state">
      No hay pacientes registrados para este ganadero.
    </p>
    <p v-if="!selectedClient" class="empty-state">
      Selecciona un cliente para ver sus fincas y animales.
    </p>
  </section>
</template>
