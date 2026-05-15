<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { HealthEvent } from "../../domain/model/health-event.entity.js";
import useSanitaryStore from "../../application/sanitary.store.js";
import useLivestockStore from "../../../livestock/application/livestock.store.js";
import useIamStore from "../../../iam/application/iam.store.js";

const { t } = useI18n();

const route = useRoute();

const router = useRouter();

const store = useSanitaryStore();

const livestock = useLivestockStore();

const iam = useIamStore();

const isEdit = computed(() => {
  if (route.params.id) {
    return true;
  }

  return false;
});

const typeOptions = [
  "Incidencia",
  "Vacuna",
  "Tratamiento",
  "Diagnostico",
  "Revision",
];

const form = ref({
  animalId: null,
  type: "Incidencia",
  date: "",
  description: "",
  veterinarian: "",
  diagnosis: "",
  treatment: "",
  prescription: "",
  followUp: "",
  nextDueDate: "",
});

const animalOptions = computed(() => {
  if (iam.currentRole === "veterinarian")
    return livestock.getAnimalsByVeterinarianId(iam.currentUserId);
  if (iam.currentRole === "rancher")
    return livestock.getAnimalsByOwnerId(iam.currentUserId);
  return livestock.animals;
});

onMounted(async () => {
  if (!livestock.loaded) await livestock.fetchAnimals();
  if (!store.loaded) await store.fetchHealthEvents();
  if (isEdit.value) {
    const event = store.getHealthEventById(route.params.id);
    if (event) {
      form.value.animalId = event.animalId;
      form.value.type = event.type;
      form.value.date = event.date;
      form.value.description = event.description;
      form.value.veterinarian = event.veterinarian;
      form.value.diagnosis = event.diagnosis;
      form.value.treatment = event.treatment;
      form.value.prescription = event.prescription;
      form.value.followUp = event.followUp;
      form.value.nextDueDate = event.nextDueDate;
    } else {
      router.push({ name: "sanitary-health-events" });
    }
  } else {
    if (animalOptions.value[0]) {
      form.value.animalId = animalOptions.value[0].id;
    } else {
      form.value.animalId = null;
    }
  }
});

/**
 * Saves the health record from the form.
 * @returns {Promise<void>}
 */
const save = async () => {
  let id = null;
  if (isEdit.value) id = route.params.id;

  const event = new HealthEvent({
    id,
    animalId: form.value.animalId,
    type: form.value.type,
    date: form.value.date,
    description: form.value.description,
    veterinarian: form.value.veterinarian,
    diagnosis: form.value.diagnosis,
    treatment: form.value.treatment,
    prescription: form.value.prescription,
    followUp: form.value.followUp,
    nextDueDate: form.value.nextDueDate,
  });
  if (isEdit.value) await store.updateHealthEvent(event);
  else await store.addHealthEvent(event);
  router.push({ name: "sanitary-health-events" });
};

const formTitle = computed(() => {
  if (isEdit.value) return t("health.editTitle");
  return t("health.newTitle");
});
</script>

<template>
  <form class="panel form-grid friendly-form" @submit.prevent="save">
    <div class="form-hero full">
      <i class="pi pi-heart"></i>
      <div>
        <span class="section-chip">Sanitary BC</span>
        <h2>{{ formTitle }}</h2>
        <p>
          Documenta sintomas, diagnostico, tratamiento y seguimiento sanitario
          del animal.
        </p>
      </div>
    </div>
    <label
      >{{ t("health.animal")
      }}<pv-select
        v-model="form.animalId"
        :options="animalOptions"
        option-label="name"
        option-value="id"
    /></label>
    <label
      >{{ t("health.type")
      }}<pv-select v-model="form.type" :options="typeOptions"
    /></label>
    <label
      >{{ t("health.date")
      }}<pv-input-text v-model="form.date" type="date" required
    /></label>
    <label
      >{{ t("health.nextDueDate")
      }}<pv-input-text v-model="form.nextDueDate" type="date"
    /></label>
    <label
      >{{ t("health.veterinarian")
      }}<pv-input-text
        v-model="form.veterinarian"
        placeholder="Nombre del responsable"
        required
    /></label>
    <label class="full"
      >{{ t("health.description")
      }}<pv-textarea
        v-model="form.description"
        rows="4"
        placeholder="Describe sintomas, hallazgos u observaciones"
        required
    /></label>
    <label class="full"
      >{{ t("health.diagnosis")
      }}<pv-textarea v-model="form.diagnosis" rows="3"
    /></label>
    <label class="full"
      >{{ t("health.treatment")
      }}<pv-textarea v-model="form.treatment" rows="3"
    /></label>
    <label class="full"
      >{{ t("health.prescription")
      }}<pv-textarea v-model="form.prescription" rows="3"
    /></label>
    <label class="full"
      >{{ t("health.followUp") }}<pv-textarea v-model="form.followUp" rows="3"
    /></label>
    <div class="form-actions friendly-actions full">
      <pv-button :label="t('common.save')" icon="pi pi-save" type="submit" />
      <pv-button
        :label="t('common.cancel')"
        severity="secondary"
        outlined
        @click="router.push({ name: 'sanitary-health-events' })"
      />
    </div>
  </form>
</template>
