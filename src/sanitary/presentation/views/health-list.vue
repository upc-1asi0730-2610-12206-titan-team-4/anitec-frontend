<script setup>
import { computed, onMounted, toRefs } from "vue";
import { useConfirm } from "primevue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useSanitaryStore from "../../application/sanitary.store.js";
import useLivestockStore from "../../../livestock/application/livestock.store.js";
import useIamStore from "../../../iam/application/iam.store.js";

const { t } = useI18n();

const router = useRouter();

const confirm = useConfirm();

const store = useSanitaryStore();

const livestock = useLivestockStore();

const iam = useIamStore();
const { healthEvents, loaded, errors } = toRefs(store);

/**
 * Returns visible health records based on the user role.
 */
const visibleHealthEvents = computed(() => {
  let visibleAnimals = livestock.animals;

  if (iam.currentRole === "veterinarian") {
    visibleAnimals = livestock.getAnimalsByVeterinarianId(iam.currentUserId);
  }

  if (iam.currentRole === "rancher") {
    visibleAnimals = livestock.getAnimalsByOwnerId(iam.currentUserId);
  }

  const visibleAnimalIds = [];

  visibleAnimals.forEach((animal) => {
    visibleAnimalIds.push(Number(animal.id));
  });

  const visibleEvents = [];

  healthEvents.value.forEach((event) => {
    if (visibleAnimalIds.includes(Number(event.animalId))) {
      visibleEvents.push(event);
    }
  });

  return visibleEvents;
});

onMounted(() => {
  if (!store.loaded) store.fetchHealthEvents();
  if (!livestock.loaded) livestock.fetchAnimals();
});

/**
 * Finds the animal name related to a health record.
 * @param {number|string} id Animal identifier.
 * @returns {string}
 */
const animalName = (id) => {
  let name = "Animal";

  livestock.animals.forEach((animal) => {
    if (Number(animal.id) === Number(id)) {
      name = animal.name;
    }
  });

  return name;
};

/**
 * Returns fallback text when a field is empty.
 * @param {string} value Original value.
 * @param {string} defaultText Fallback text.
 * @returns {string}
 */
const textOrDefault = (value, defaultText) => {
  if (value) {
    return value;
  }

  return defaultText;
};

/**
 * Shows the confirmation before deleting a health record.
 * @param {Object} event Selected record.
 */
const confirmDelete = (event) =>
  confirm.require({
    message: t("health.confirmDelete"),
    header: t("common.confirmDelete"),
    icon: "pi pi-exclamation-triangle",
    accept: () => store.deleteHealthEvent(event),
  });
</script>

<template>
  <div class="panel">
    <div class="panel-header">
      <div>
        <span class="section-chip">Sanitary BC</span>
        <h2>{{ t("health.title") }}</h2>
      </div>
      <pv-button
        :label="t('health.new')"
        icon="pi pi-plus"
        @click="router.push({ name: 'sanitary-health-event-new' })"
      />
    </div>
    <div v-if="!loaded" class="empty-state">Cargando eventos sanitarios...</div>

    <div v-else class="record-card-grid health-card-grid">
      <article
        v-for="event in visibleHealthEvents"
        :key="event.id"
        class="record-card health-record-card"
      >
        <header>
          <div>
            <span>{{ event.date }}</span>
            <h3>{{ animalName(event.animalId) }}</h3>
          </div>
          <pv-tag :value="event.type" severity="info" />
        </header>

        <p>{{ event.description }}</p>

        <dl>
          <div>
            <dt>{{ t("health.animal") }}</dt>
            <dd>{{ animalName(event.animalId) }}</dd>
          </div>
          <div>
            <dt>{{ t("health.type") }}</dt>
            <dd>{{ event.type }}</dd>
          </div>
          <div>
            <dt>{{ t("health.date") }}</dt>
            <dd>{{ event.date }}</dd>
          </div>
          <div>
            <dt>{{ t("health.veterinarian") }}</dt>
            <dd>{{ textOrDefault(event.veterinarian, "Sin asignar") }}</dd>
          </div>
          <div>
            <dt>{{ t("health.diagnosis") }}</dt>
            <dd>{{ textOrDefault(event.diagnosis, "Sin diagnostico") }}</dd>
          </div>
          <div>
            <dt>{{ t("health.treatment") }}</dt>
            <dd>{{ textOrDefault(event.treatment, "Sin tratamiento") }}</dd>
          </div>
          <div>
            <dt>{{ t("health.prescription") }}</dt>
            <dd>{{ textOrDefault(event.prescription, "Sin receta") }}</dd>
          </div>
          <div>
            <dt>{{ t("health.followUp") }}</dt>
            <dd>{{ textOrDefault(event.followUp, "Sin seguimiento") }}</dd>
          </div>
          <div>
            <dt>{{ t("health.nextDueDate") }}</dt>
            <dd>{{ textOrDefault(event.nextDueDate, "Sin fecha") }}</dd>
          </div>
        </dl>

        <footer>
          <pv-button
            :label="t('common.edit')"
            icon="pi pi-pencil"
            outlined
            @click="
              router.push({
                name: 'sanitary-health-event-edit',
                params: { id: event.id },
              })
            "
          />
          <pv-button
            :label="t('common.delete')"
            icon="pi pi-trash"
            severity="danger"
            text
            @click="confirmDelete(event)"
          />
        </footer>
      </article>
    </div>

    <p v-if="loaded && !visibleHealthEvents.length" class="empty-state">
      No hay eventos sanitarios registrados.
    </p>
    <p v-if="errors.length" class="error-text">{{ t("common.errors") }}</p>
  </div>
</template>
