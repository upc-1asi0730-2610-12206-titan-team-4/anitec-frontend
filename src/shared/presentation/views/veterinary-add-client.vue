<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useIamStore from "../../../iam/application/iam.store.js";
import useLivestockStore from "../../../livestock/application/livestock.store.js";

const { t } = useI18n();

const router = useRouter();

const iam = useIamStore();

const livestock = useLivestockStore();

const search = ref("");

const availableRanchers = ref([]);

onMounted(async () => {
  await iam.fetchVeterinarianClients();
  availableRanchers.value = await iam.fetchAvailableRanchers();
  if (!livestock.herds.length) await livestock.fetchHerds();
  if (!livestock.loaded) await livestock.fetchAnimals();
});

/**
 * Gets all available users with the rancher role.
 */
const ranchers = computed(() => {
  const rancherUsers = [];

  availableRanchers.value.forEach((user) => {
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
 * Adds a rancher to the veterinarian portfolio.
 * @param {Object} rancher Selected rancher.
 */
const sendRequest = async (rancher) => {
  const assigned = await iam.assignRancherToVeterinarian(rancher.id);

  if (assigned) {
    availableRanchers.value = await iam.fetchAvailableRanchers();
  }
};
</script>

<template>
  <section class="panel client-discovery-panel">
    <div class="panel-header">
      <div>
        <span class="section-chip">{{ t("veterinary.rancherClients") }}</span>
        <h2>{{ t("veterinary.addClientTitle") }}</h2>
        <p>{{ t("veterinary.addClientSubtitle") }}</p>
      </div>
      <pv-button
        :label="t('veterinary.backToClients')"
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
          :placeholder="t('veterinary.searchRancherPlaceholder')"
        />
      </span>
      <small>{{ t("veterinary.ranchersFound", { count: filteredRanchers.length }) }}</small>
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
              >{{ herdsByRancher(rancher.id).length }} {{ t("veterinary.farms").toLowerCase() }} -
              {{ animalCountByRancher(rancher.id) }} {{ t("veterinary.animals").toLowerCase() }}</span
            >
          </div>
        </div>

        <div class="farm-chip-list">
          <span v-for="herd in herdsByRancher(rancher.id)" :key="herd.id">{{
            herd.name
          }}</span>
          <span v-if="!herdsByRancher(rancher.id).length"
            >{{ t("veterinary.noFarms") }}</span
          >
        </div>

        <footer>
          <pv-tag
            v-if="isAssignedToCurrentVet(rancher)"
            :value="t('veterinary.clientAdded')"
            severity="success"
          />
          <pv-button
            v-else
            :label="t('veterinary.addClient')"
            icon="pi pi-send"
            @click="sendRequest(rancher)"
          />
        </footer>
      </article>
    </div>

    <p v-if="!filteredRanchers.length" class="empty-state">
      {{ t("veterinary.noRanchersFound") }}
    </p>
  </section>
</template>
