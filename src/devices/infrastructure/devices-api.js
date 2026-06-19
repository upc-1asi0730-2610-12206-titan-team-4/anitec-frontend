import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

const devicesEndpointPath =
    import.meta.env.VITE_DEVICES_ENDPOINT_PATH || "/devices";

/**
 * Handles HTTP requests for IoT devices and readings.
 */
export class DevicesApi extends BaseApi {
    #devicesEndpoint;

    constructor() {
        super();
        this.#devicesEndpoint = new BaseEndpoint(this, devicesEndpointPath);
    }

    /** @returns {Promise} Lists IoT devices. */
    getDevices() {
        return this.#devicesEndpoint.getAll();
    }

    /** @param {Object} resource Device data. @returns {Promise} */
    createDevice(resource) {
        return this.#devicesEndpoint.create(resource);
    }

    /** @param {Object} resource Updated device data. @returns {Promise} */
    updateDevice(resource) {
        return this.#devicesEndpoint.update(resource.id, resource);
    }

    /** @param {number|string} id Device identifier. @returns {Promise} */
    deleteDevice(id) {
        return this.#devicesEndpoint.delete(id);
    }

    /** @param {number|string} deviceId Device identifier. @returns {Promise} */
    getMetricsByDevice(deviceId) {
        return this.http.get(`${devicesEndpointPath}/${deviceId}/metrics`);
    }

    /** @param {number|string} deviceId Device identifier. @returns {Promise} */
    getLatestMetricByDevice(deviceId) {
        return this.http.get(
            `${devicesEndpointPath}/${deviceId}/latest-metric`,
        );
    }
}
