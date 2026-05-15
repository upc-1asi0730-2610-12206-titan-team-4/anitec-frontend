<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import useIamStore from "../../../iam/application/iam.store.js";
import useLivestockStore from "../../../livestock/application/livestock.store.js";

const router = useRouter();

const iam = useIamStore();

const livestock = useLivestockStore();

const search = ref("");

onMounted(async () => {
  if (!livestock.herds.length) await livestock.fetchHerds();
  if (!livestock.loaded) await livestock.fetchAnimals();
});

/**
 * Gets all demo users with the rancher role.
 */
const ranchers = computed(() => {
  const rancherUsers = [];

  iam.demoUsers.forEach((user) => {
    if (user.role === "rancher") {
      rancherUsers.push(user);
    }
  });

  return rancherUsers;
});

/**
 * Filters ranchers by name or by their farm names.
 */
const filteredRanchers = computed(() => {
  const term = search.value.trim().toLowerCase();
  if (!term) return ranchers.value;

  const results = [];

  ranchers.value.forEach((rancher) => {
    const herdNames = [];

    livestock.getHerdsByOwnerId(rancher.id).forEach((herd) => {
      herdNames.push(herd.name);
    });

    const text = `${rancher.fullName} ${herdNames.join(" ")}`.toLowerCase();

    if (text.includes(term)) {
      results.push(rancher);
    }
  });

  return results;
});

/**
 * Generates initials to show a simple avatar.
 * @param {string} name Full name.
 * @returns {string}
 */
const initials = (name) => {
  const parts = name.split(" ");
  let result = "";
  let usedParts = 0;

  parts.forEach((part) => {
    if (part && usedParts < 2) {
      result = result + part[0];
      usedParts++;
    }
  });

  return result.toUpperCase();
};

const isAssignedToCurrentVet = (rancher) =>
  Number(rancher.veterinarianId) === Number(iam.currentUserId);

const herdsByRancher = (rancherId) => livestock.getHerdsByOwnerId(rancherId);

const animalCountByRancher = (rancherId) =>
  livestock.getAnimalsByOwnerId(rancherId).length;

/**
 * Simulates the request to add a rancher to the veterinarian portfolio.
 * @param {Object} rancher Selected rancher.
 */
const sendRequest = (rancher) => {
  iam.assignRancherToVeterinarian(rancher.id);
};
</script>

<template>
  <section class="panel client-discovery-panel">
    <div class="panel-header">
      <div>
        <span class="section-chip">Clientes ganaderos</span>
        <h2>Agregar cliente</h2>
        <p>
          Busca ganaderos registrados y envia una peticion para acceder a sus
          datos productivos y sanitarios.
        </p>
      </div>
      <pv-button
        label="Volver a clientes"
        icon="pi pi-arrow-left"
        severity="secondary"
        outlined
        @click="router.push('/veterinary/clients')"
      />
    </div>

    <div class="client-discovery-toolbar">
      <span class="p-input-icon-left">
        <i class="pi pi-search"></i>
        <pv-input-text
          v-model="search"
          placeholder="Buscar por nombre del ganadero o finca"
        />
      </span>
      <small>{{ filteredRanchers.length }} ganaderos encontrados</small>
    </div>

    <div class="client-discovery-grid">
      <article
        v-for="rancher in filteredRanchers"
        :key="rancher.id"
        class="client-discovery-card"
      >
        <div class="client-profile">
          <div class="client-avatar" aria-hidden="true">
            {{ initials(rancher.fullName) }}
          </div>
          <div>
            <h3>{{ rancher.fullName }}</h3>
            <span
              >{{ herdsByRancher(rancher.id).length }} fincas -
              {{ animalCountByRancher(rancher.id) }} animales</span
            >
          </div>
        </div>

        <div class="farm-chip-list">
          <span v-for="herd in herdsByRancher(rancher.id)" :key="herd.id">{{
            herd.name
          }}</span>
          <span v-if="!herdsByRancher(rancher.id).length"
            >Sin fincas registradas</span
          >
        </div>

        <footer>
          <pv-tag
            v-if="isAssignedToCurrentVet(rancher)"
            value="Cliente agregado"
            severity="success"
          />
          <pv-button
            v-else
            label="Enviar peticion"
            icon="pi pi-send"
            @click="sendRequest(rancher)"
          />
        </footer>
      </article>
    </div>

    <p v-if="!filteredRanchers.length" class="empty-state">
      No se encontraron ganaderos con ese criterio.
    </p>
  </section>
</template>
