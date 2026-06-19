<script setup>
import { computed, onMounted } from "vue";
import { useConfirm } from "primevue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useDevicesStore from "../../application/devices.store.js";
import useIamStore from "../../../iam/application/iam.store.js";
import useLivestockStore from "../../../livestock/application/livestock.store.js";

const { t } = useI18n();

const router = useRouter();

const confirm = useConfirm();

const devicesStore = useDevicesStore();

const iam = useIamStore();

const livestock = useLivestockStore();

onMounted(async () => {
  if (!livestock.herds.length) await livestock.fetchHerds();
  if (!livestock.loaded) await livestock.fetchAnimals();
  await devicesStore.fetchDevices();

  devicesStore.devices.forEach((device) => {
    devicesStore.fetchLatestMetric(device.id);
    devicesStore.fetchDeviceMetrics(device.id);
  });
});

const visibleHerdIds = computed(() => {
  const ids = [];
  const herds =
    iam.currentRole === "veterinarian"
      ? livestock.getHerdsByVeterinarianId(iam.currentUserId)
      : livestock.getHerdsByOwnerId(iam.currentUserId);

  herds.forEach((herd) => ids.push(Number(herd.id)));
  return ids;
});

const visibleAnimalIds = computed(() => {
  const ids = [];
  const animals =
    iam.currentRole === "veterinarian"
      ? livestock.getAnimalsByVeterinarianId(iam.currentUserId)
      : livestock.getAnimalsByOwnerId(iam.currentUserId);

  animals.forEach((animal) => ids.push(Number(animal.id)));
  return ids;
});

const visibleDevices = computed(() => {
  const devices = [];

  devicesStore.devices.forEach((device) => {
    const belongsToHerd =
      device.herdId && visibleHerdIds.value.includes(Number(device.herdId));
    const belongsToAnimal =
      device.animalId &&
      visibleAnimalIds.value.includes(Number(device.animalId));

    if (belongsToHerd || belongsToAnimal) {
      devices.push(device);
    }
  });

  return devices;
});

const deviceLocation = (device) => {
  if (device.animalId) {
    const animal = livestock.getAnimalById(device.animalId);
    if (animal) return t("iot.animalLocation", { name: animal.name });
  }

  if (device.herdId) {
    return t("iot.farmLocation", { name: livestock.getHerdName(device.herdId) });
  }

  return t("iot.unassigned");
};

const latestMetric = (deviceId) => devicesStore.latestMetrics[deviceId];

const metricCount = (deviceId) => {
  const metrics = devicesStore.metricsByDevice[deviceId];
  if (!metrics) return 0;
  return metrics.length;
};

const statusSeverity = (status) => {
  if (String(status).toLowerCase() === "activo") return "success";
  if (String(status).toLowerCase() === "active") return "success";
  return "warn";
};

const canManageDevices = computed(() => iam.currentRole === "rancher");

const confirmDelete = (device) => {
  confirm.require({
    message: t("iot.confirmDelete", { name: device.name }),
    header: t("iot.confirmDeleteTitle"),
    icon: "pi pi-exclamation-triangle",
    accept: () => devicesStore.deleteDevice(device),
  });
};
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <div>
        <span class="section-chip">IoT BC</span>
        <h2>{{ t("iot.title") }}</h2>
        <p>{{ t("iot.subtitle") }}</p>
      </div>
      <pv-button
        v-if="canManageDevices"
        :label="t('iot.new')"
        icon="pi pi-plus"
        @click="router.push({ name: 'iot-device-new' })"
      />
    </div>

    <p v-if="devicesStore.loading" class="empty-state">
      {{ t("iot.loading") }}
    </p>

    <p v-if="devicesStore.errors.length" class="empty-state">
      {{ t("iot.connectionError") }}
    </p>

    <div class="record-card-grid">
      <article
        v-for="device in visibleDevices"
        :key="device.id"
        class="record-card"
      >
        <header>
          <div>
            <span>{{ device.type }}</span>
            <h3>{{ device.name }}</h3>
          </div>
          <pv-tag
            :value="device.status"
            :severity="statusSeverity(device.status)"
          />
        </header>

        <dl>
          <div>
            <dt>{{ t("iot.series") }}</dt>
            <dd>{{ device.serialNumber }}</dd>
          </div>
          <div>
            <dt>{{ t("iot.location") }}</dt>
            <dd>{{ deviceLocation(device) }}</dd>
          </div>
          <div>
            <dt>{{ t("iot.readings") }}</dt>
            <dd>{{ t("iot.registeredReadings", { count: metricCount(device.id) }) }}</dd>
          </div>
          <div>
            <dt>{{ t("iot.last") }}</dt>
            <dd v-if="latestMetric(device.id)">
              {{ latestMetric(device.id).type }}:
              {{ latestMetric(device.id).value }}
              {{ latestMetric(device.id).unit }}
            </dd>
            <dd v-else>{{ t("iot.noReadings") }}</dd>
          </div>
        </dl>

        <footer v-if="canManageDevices">
          <pv-button
            :label="t('common.edit')"
            icon="pi pi-pencil"
            outlined
            @click="
              router.push({
                name: 'iot-device-edit',
                params: { id: device.id },
              })
            "
          />
          <pv-button
            :label="t('common.delete')"
            icon="pi pi-trash"
            severity="danger"
            text
            @click="confirmDelete(device)"
          />
        </footer>
      </article>
    </div>

    <p
      v-if="
        !devicesStore.loading &&
        !devicesStore.errors.length &&
        !visibleDevices.length
      "
      class="empty-state"
    >
      {{ t("iot.empty") }}
    </p>
  </section>
</template>
