<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import useDevicesStore from "../../application/devices.store.js";
import useIamStore from "../../../iam/application/iam.store.js";
import useLivestockStore from "../../../livestock/application/livestock.store.js";

const { t } = useI18n();

const route = useRoute();

const router = useRouter();

const devicesStore = useDevicesStore();

const livestock = useLivestockStore();

const iam = useIamStore();

const isEdit = computed(() => {
  if (route.params.id) {
    return true;
  }

  return false;
});

const typeOptions = computed(() => [
  t("iot.types.scale"),
  t("iot.types.collar"),
  t("iot.types.thermalCamera"),
  t("iot.types.earTag"),
  t("iot.types.weatherStation"),
  t("iot.types.environmentalSensor"),
]);

const statusOptions = computed(() => [
  t("iot.statuses.active"),
  t("iot.statuses.maintenance"),
  t("iot.statuses.inactive"),
]);

const assignmentOptions = computed(() => [
  t("iot.farm"),
  t("iot.animal"),
  t("iot.noAssignment"),
]);

const form = ref({
  name: "",
  type: "",
  serialNumber: "",
  status: "",
  assignmentType: "",
  herdId: null,
  animalId: null,
});

const herdOptions = computed(() => {
  if (iam.currentRole === "rancher") {
    return livestock.getHerdsByOwnerId(iam.currentUserId);
  }

  return livestock.herds;
});

const animalOptions = computed(() => {
  if (iam.currentRole === "rancher") {
    return livestock.getAnimalsByOwnerId(iam.currentUserId);
  }

  return livestock.animals;
});

const formTitle = computed(() => {
  if (isEdit.value) return t("iot.editTitle");
  return t("iot.newTitle");
});

const fillAssignment = (device) => {
  if (device.animalId) {
    form.value.assignmentType = t("iot.animal");
    form.value.animalId = device.animalId;
    form.value.herdId = null;
    return;
  }

  if (device.herdId) {
    form.value.assignmentType = t("iot.farm");
    form.value.herdId = device.herdId;
    form.value.animalId = null;
    return;
  }

  form.value.assignmentType = t("iot.noAssignment");
  form.value.herdId = null;
  form.value.animalId = null;
};

onMounted(async () => {
  form.value.type = t("iot.types.collar");
  form.value.status = t("iot.statuses.active");
  form.value.assignmentType = t("iot.farm");

  if (!livestock.herds.length) await livestock.fetchHerds();
  if (!livestock.loaded) await livestock.fetchAnimals();
  if (!devicesStore.loaded) await devicesStore.fetchDevices();

  if (isEdit.value) {
    const device = devicesStore.getDeviceById(route.params.id);

    if (device) {
      form.value.name = device.name;
      form.value.type = device.type;
      form.value.serialNumber = device.serialNumber;
      form.value.status = device.status;
      fillAssignment(device);
    } else {
      router.push({ name: "iot-dashboard" });
    }
  } else {
    if (herdOptions.value[0]) {
      form.value.herdId = herdOptions.value[0].id;
    }
  }
});

const save = async () => {
  let herdId = null;
  let animalId = null;

  if (form.value.assignmentType === t("iot.farm")) {
    herdId = form.value.herdId;
  }

  if (form.value.assignmentType === t("iot.animal")) {
    animalId = form.value.animalId;
  }

  const device = {
    id: isEdit.value ? route.params.id : null,
    name: form.value.name,
    type: form.value.type,
    serialNumber: form.value.serialNumber,
    status: form.value.status,
    herdId,
    animalId,
  };

  const saved = isEdit.value
    ? await devicesStore.updateDevice(device)
    : await devicesStore.addDevice(device);

  if (saved) router.push({ name: "iot-dashboard" });
};
</script>

<template>
  <form class="panel form-grid friendly-form" @submit.prevent="save">
    <div class="form-hero full">
      <i class="pi pi-wifi"></i>
      <div>
        <span class="section-chip">IoT BC</span>
        <h2>{{ formTitle }}</h2>
        <p>{{ t("iot.formSubtitle") }}</p>
      </div>
    </div>

    <label>
      {{ t("iot.name") }}
      <pv-input-text
        v-model="form.name"
        :placeholder="t('iot.namePlaceholder')"
        required
      />
    </label>

    <label>
      {{ t("iot.type") }}
      <pv-select v-model="form.type" :options="typeOptions" editable required />
    </label>

    <label>
      {{ t("iot.serialNumber") }}
      <pv-input-text
        v-model="form.serialNumber"
        :placeholder="t('iot.serialPlaceholder')"
        required
      />
    </label>

    <label>
      {{ t("iot.status") }}
      <pv-select v-model="form.status" :options="statusOptions" required />
    </label>

    <label>
      {{ t("iot.assignTo") }}
      <pv-select
        v-model="form.assignmentType"
        :options="assignmentOptions"
        required
      />
    </label>

    <label v-if="form.assignmentType === t('iot.farm')">
      {{ t("iot.farm") }}
      <pv-select
        v-model="form.herdId"
        :options="herdOptions"
        option-label="name"
        option-value="id"
        required
      />
    </label>

    <p
      v-if="form.assignmentType === t('iot.farm') && !herdOptions.length"
      class="empty-state full"
    >
      {{ t("iot.noFarms") }}
    </p>

    <label v-if="form.assignmentType === t('iot.animal')">
      {{ t("iot.animal") }}
      <pv-select
        v-model="form.animalId"
        :options="animalOptions"
        option-label="name"
        option-value="id"
        required
      />
    </label>

    <p
      v-if="form.assignmentType === t('iot.animal') && !animalOptions.length"
      class="empty-state full"
    >
      {{ t("iot.noAnimals") }}
    </p>

    <p v-if="devicesStore.errors.length" class="error-text full">
      {{ t("iot.saveError") }}
    </p>

    <div class="form-actions friendly-actions full">
      <pv-button :label="t('common.save')" icon="pi pi-save" type="submit" />
      <pv-button
        :label="t('common.cancel')"
        severity="secondary"
        outlined
        @click="router.push({ name: 'iot-dashboard' })"
      />
    </div>
  </form>
</template>
