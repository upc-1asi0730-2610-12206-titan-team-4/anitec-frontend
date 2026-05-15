import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

const healthEventsEndpointPath = import.meta.env
    .VITE_HEALTH_EVENTS_ENDPOINT_PATH;

/**
 * Handles HTTP requests for health records.
 */
export class SanitaryApi extends BaseApi {
    #healthEventsEndpoint;

    /**
     * Prepares the health events endpoint.
     */
    constructor() {
        super();
        this.#healthEventsEndpoint = new BaseEndpoint(
            this,
            healthEventsEndpointPath,
        );
    }

    /** @returns {Promise} Lists health records. */
    getHealthEvents() {
        return this.#healthEventsEndpoint.getAll();
    }

    /** @param {Object} resource Health record data. @returns {Promise} */
    createHealthEvent(resource) {
        return this.#healthEventsEndpoint.create(resource);
    }

    /** @param {Object} resource Datos actualizados del registro sanitario. @returns {Promise} */
    updateHealthEvent(resource) {
        return this.#healthEventsEndpoint.update(resource.id, resource);
    }

    /** @param {number|string} id Identificador del registro sanitario. @returns {Promise} */
    deleteHealthEvent(id) {
        return this.#healthEventsEndpoint.delete(id);
    }
}
