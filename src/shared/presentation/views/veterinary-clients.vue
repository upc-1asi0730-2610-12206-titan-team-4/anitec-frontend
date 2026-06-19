<script setup>
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useLivestockStore from "../../../livestock/application/livestock.store.js";
import useSanitaryStore from "../../../sanitary/application/sanitary.store.js";
import useIamStore from "../../../iam/application/iam.store.js";

const { t } = useI18n();

const router = useRouter();

const livestock = useLivestockStore();

const sanitary = useSanitaryStore();

const iam = useIamStore();

onMounted(async () => {
  await iam.fetchVeterinarianClients();
  if (!livestock.herds.length) await livestock.fetchHerds();
  if (!livestock.loaded) await livestock.fetchAnimals();
  if (!sanitary.loaded) await sanitary.fetchHealthEvents();
});

const clients = computed(() => livestock.getAssignedRanchers());

const herdsByClient = (clientId) => livestock.getHerdsByOwnerId(clientId);

const animalsByClient = (clientId) => livestock.getAnimalsByOwnerId(clientId);

/**
 * Gets the health records associated with a client's animals.
 * @param {number|string} clientId Client identifier.
 * @returns {Object[]}
 */
const healthEventsByClient = (clientId) => {
  const animalIds = [];

  animalsByClient(clientId).forEach((animal) => {
    animalIds.push(Number(animal.id));
  });

  const clientEvents = [];

  sanitary.healthEvents.forEach((event) => {
    if (animalIds.includes(Number(event.animalId))) {
      clientEvents.push(event);
    }
  });

  return clientEvents;
};

/**
 * Counts a client's pending follow-ups.
 * @param {number|string} clientId Client identifier.
 * @returns {number}
 */
const alertsByClient = (clientId) => {
  let total = 0;

  healthEventsByClient(clientId).forEach((event) => {
    if (event.nextDueDate) {
      total++;
    }
  });

  return total;
};

/**
 * Counts the different species a client has.
 * @param {number|string} clientId Client identifier.
 * @returns {number}
 */
const speciesByClient = (clientId) => {
  const species = [];

  animalsByClient(clientId).forEach((animal) => {
    let name = "Sin clasificar";

    if (animal.species) {
      name = animal.species;
    }

    if (!species.includes(name)) {
      species.push(name);
    }
  });

  return species.length;
};

const locationsByClient = (clientId) => {
  const locations = [];

  herdsByClient(clientId).forEach((herd) => {
    if (herd.location && !locations.includes(herd.location)) {
      locations.push(herd.location);
    }
  });

  if (locations.length) {
    return locations.join(", ");
  }

  return t("veterinary.location");
};

const herdNamesByClient = (clientId) => {
  const names = [];

  herdsByClient(clientId).forEach((herd) => {
    names.push(herd.name);
  });

  if (names.length) {
    return names.join(", ");
  }

  return t("veterinary.noFarms");
};

/**
 * Removes a client from the current veterinarian portfolio.
 * @param {Object} client Selected client.
 */
const removeClient = async (client) => {
  await iam.unassignRancherFromVeterinarian(client.id);
};

const alertSeverity = (clientId) => {
  if (alertsByClient(clientId)) return "warn";
  return "success";
};
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <div>
        <span class="section-chip">Veterinary Workspace</span>
        <h2>{{ t("veterinary.clientsTitle") }}</h2>
        <p>{{ t("veterinary.clientsSubtitle") }}</p>
      </div>
      <pv-button
        label="Agregar cliente"
        icon="pi pi-user-plus"
        @click="router.push('/veterinary/add-client')"
      />
    </div>

    <div class="assigned-client-grid">
      <article
        v-for="client in clients"
        :key="client.id"
        class="assigned-client-card"
      >
        <header>
          <div>
            <span>Ganadero</span>
            <h3>{{ client.fullName }}</h3>
          </div>
          <pv-tag
            :value="t('veterinary.alerts', { count: alertsByClient(client.id) })"
            :severity="alertSeverity(client.id)"
          />
        </header>

        <dl>
          <div>
            <dt>{{ t("veterinary.farms") }}</dt>
            <dd>{{ herdNamesByClient(client.id) }}</dd>
          </div>
          <div>
            <dt>{{ t("veterinary.location") }}</dt>
            <dd>{{ locationsByClient(client.id) }}</dd>
          </div>
          <div>
            <dt>{{ t("veterinary.animals") }}</dt>
            <dd>{{ t("veterinary.registeredAnimals", { count: animalsByClient(client.id).length }) }}</dd>
          </div>
          <div>
            <dt>{{ t("veterinary.types") }}</dt>
            <dd>{{ t("veterinary.species", { count: speciesByClient(client.id) }) }}</dd>
          </div>
          <div>
            <dt>{{ t("veterinary.health") }}</dt>
            <dd>
              {{ t("veterinary.healthRecords", { count: healthEventsByClient(client.id).length }) }}
            </dd>
          </div>
        </dl>

        <footer>
          <pv-button
            :label="t('veterinary.viewPatients')"
            icon="pi pi-id-card"
            outlined
            @click="
              router.push({
                path: '/veterinary/patients',
                query: { clientId: client.id },
              })
            "
          />
          <pv-button
            :label="t('veterinary.deleteClient')"
            icon="pi pi-trash"
            severity="danger"
            outlined
            @click="removeClient(client)"
          />
        </footer>
      </article>
    </div>

    <p v-if="!clients.length" class="empty-state">
      {{ t("veterinary.noAssignedClients") }}
    </p>
  </section>
</template>
