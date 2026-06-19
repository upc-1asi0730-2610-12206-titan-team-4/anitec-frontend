import { defineStore } from "pinia";
import { ref } from "vue";
import { DevicesApi } from "../infrastructure/devices-api.js";
import { DeviceAssembler } from "../infrastructure/device.assembler.js";
import { DeviceMetricAssembler } from "../infrastructure/device-metric.assembler.js";

const api = new DevicesApi();

/**
 * Store that manages IoT devices and readings.
 */
const useDevicesStore = defineStore("devices", () => {
    const devices = ref([]);

    const metricsByDevice = ref({});

    const latestMetrics = ref({});

    const errors = ref([]);

    const loaded = ref(false);

    const loading = ref(false);

    function fetchDevices() {
        loading.value = true;
        return api
            .getDevices()
            .then((response) => {
                devices.value = DeviceAssembler.toEntitiesFromResponse(response);
                loaded.value = true;
                errors.value = [];
                return devices.value;
            })
            .catch((error) => errors.value.push(error))
            .finally(() => {
                loading.value = false;
            });
    }

    function fetchDeviceMetrics(deviceId) {
        return api
            .getMetricsByDevice(deviceId)
            .then((response) => {
                metricsByDevice.value[deviceId] =
                    DeviceMetricAssembler.toEntitiesFromResponse(response);
                return metricsByDevice.value[deviceId];
            })
            .catch((error) => errors.value.push(error));
    }

    function fetchLatestMetric(deviceId) {
        return api
            .getLatestMetricByDevice(deviceId)
            .then((response) => {
                latestMetrics.value[deviceId] =
                    DeviceMetricAssembler.toEntityFromResource(response.data);
                return latestMetrics.value[deviceId];
            })
            .catch((error) => errors.value.push(error));
    }

    function getDeviceById(id) {
        let selectedDevice = null;

        for (let i = 0; i < devices.value.length; i++) {
            const device = devices.value[i];

            if (Number(device.id) === Number(id)) {
                selectedDevice = device;
            }
        }

        return selectedDevice;
    }

    function addDevice(device) {
        return api
            .createDevice(device)
            .then((response) => {
                devices.value.push(
                    DeviceAssembler.toEntityFromResource(response.data),
                );
                errors.value = [];
                return true;
            })
            .catch((error) => {
                errors.value.push(error);
                return false;
            });
    }

    function updateDevice(device) {
        return api
            .updateDevice(device)
            .then((response) => {
                const updated = DeviceAssembler.toEntityFromResource(
                    response.data,
                );

                let index = -1;

                for (let i = 0; i < devices.value.length; i++) {
                    const item = devices.value[i];

                    if (Number(item.id) === Number(updated.id)) {
                        index = i;
                    }
                }

                if (index !== -1) devices.value[index] = updated;
                errors.value = [];
                return true;
            })
            .catch((error) => {
                errors.value.push(error);
                return false;
            });
    }

    function deleteDevice(device) {
        return api
            .deleteDevice(device.id)
            .then(() => {
                const newDevices = [];

                devices.value.forEach((item) => {
                    if (Number(item.id) !== Number(device.id)) {
                        newDevices.push(item);
                    }
                });

                devices.value = newDevices;
                delete metricsByDevice.value[device.id];
                delete latestMetrics.value[device.id];
                errors.value = [];
            })
            .catch((error) => errors.value.push(error));
    }

    return {
        devices,
        metricsByDevice,
        latestMetrics,
        errors,
        loaded,
        loading,
        fetchDevices,
        fetchDeviceMetrics,
        fetchLatestMetric,
        getDeviceById,
        addDevice,
        updateDevice,
        deleteDevice,
    };
});

export default useDevicesStore;
