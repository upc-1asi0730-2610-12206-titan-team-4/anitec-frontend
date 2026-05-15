import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const farmActivitiesEndpointPath = import.meta.env.VITE_FARM_ACTIVITIES_ENDPOINT_PATH;

/**
 * Handles HTTP requests for calendar activities.
 */
export class ActivitiesApi extends BaseApi {
    #activitiesEndpoint;

    /**
     * Prepares the activities endpoint using the environment variable.
     */
    constructor() {
        super();
        this.#activitiesEndpoint = new BaseEndpoint(this, farmActivitiesEndpointPath);
    }

    /** @returns {Promise} Lists registered activities. */
    getActivities() { return this.#activitiesEndpoint.getAll(); }

    /** @param {Object} resource Activity data. @returns {Promise} */
    createActivity(resource) { return this.#activitiesEndpoint.create(resource); }

    /** @param {Object} resource Updated activity data. @returns {Promise} */
    updateActivity(resource) { return this.#activitiesEndpoint.update(resource.id, resource); }

    /** @param {number|string} id Activity identifier. @returns {Promise} */
    deleteActivity(id) { return this.#activitiesEndpoint.delete(id); }
}
