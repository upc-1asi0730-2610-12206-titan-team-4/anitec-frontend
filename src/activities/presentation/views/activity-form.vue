<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { FarmActivity } from "../../domain/model/farm-activity.entity.js";
import useActivitiesStore from "../../application/activities.store.js";
import useIamStore from "../../../iam/application/iam.store.js";

const { t } = useI18n();

const route = useRoute();

const router = useRouter();

const store = useActivitiesStore();

const iam = useIamStore();

const isEdit = computed(() => {
  if (route.params.id) {
    return true;
  }

  return false;
});

const typeOptions = [
  "Sanitario",
  "Visita veterinaria",
  "Productivo",
  "Financiero",
  "Reproductivo",
];

const priorityOptions = ["Alta", "Media", "Baja"];

const statusOptions = ["Pendiente", "Programado", "Completado"];

let ownerId = null;
let veterinarianId = null;

if (iam.currentRole === "rancher") ownerId = iam.currentUserId;
if (iam.currentRole === "veterinarian") veterinarianId = iam.currentUserId;

const form = ref({
  ownerId,
  veterinarianId,
  title: "",
  type: "Sanitario",
  date: "",
  priority: "Media",
  status: "Pendiente",
});

onMounted(async () => {
  if (!store.loaded) await store.fetchActivities();
  if (isEdit.value) {
    const activity = store.getActivityById(route.params.id);
    if (activity) {
      form.value.ownerId = activity.ownerId;
      form.value.veterinarianId = activity.veterinarianId;
      form.value.title = activity.title;
      form.value.type = activity.type;
      form.value.date = activity.date;
      form.value.priority = activity.priority;
      form.value.status = activity.status;
    } else {
      router.push({ name: "activities-calendar" });
    }
  }
});

/**
 * Saves the activity from the form.
 * @returns {Promise<void>}
 */
const save = async () => {
  let id = null;
  if (isEdit.value) id = route.params.id;

  const activity = new FarmActivity({
    id,
    ownerId: form.value.ownerId,
    veterinarianId: form.value.veterinarianId,
    title: form.value.title,
    type: form.value.type,
    date: form.value.date,
    priority: form.value.priority,
    status: form.value.status,
  });
  const saved = isEdit.value
    ? await store.updateActivity(activity)
    : await store.addActivity(activity);

  if (saved) router.push({ name: "activities-calendar" });
};

const formTitle = computed(() => {
  if (isEdit.value) return t("activities.editTitle");
  return t("activities.newTitle");
});
</script>

<template>
  <form class="panel form-grid friendly-form" @submit.prevent="save">
    <div class="form-hero full">
      <i class="pi pi-calendar-plus"></i>
      <div>
        <span class="section-chip">Activities BC</span>
        <h2>{{ formTitle }}</h2>
        <p>{{ t("activities.formSubtitle") }}</p>
      </div>
    </div>
    <label class="full"
      >{{ t("activities.activityTitle")
      }}<pv-input-text
        v-model="form.title"
        :placeholder="t('activities.titlePlaceholder')"
        required
    /></label>
    <label
      >{{ t("activities.type")
      }}<pv-select v-model="form.type" :options="typeOptions"
    /></label>
    <label
      >{{ t("activities.date")
      }}<pv-input-text v-model="form.date" type="date" required
    /></label>
    <label
      >{{ t("activities.priority")
      }}<pv-select v-model="form.priority" :options="priorityOptions"
    /></label>
    <label
      >{{ t("activities.status")
      }}<pv-select v-model="form.status" :options="statusOptions"
    /></label>
    <p v-if="store.errors.length" class="error-text full">
      {{ t("activities.saveError") }}
    </p>
    <div class="form-actions friendly-actions full">
      <pv-button :label="t('common.save')" icon="pi pi-save" type="submit" />
      <pv-button
        :label="t('common.cancel')"
        severity="secondary"
        outlined
        @click="router.push({ name: 'activities-calendar' })"
      />
    </div>
  </form>
</template>
