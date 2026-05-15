import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const animalsEndpointPath = import.meta.env.VITE_ANIMALS_ENDPOINT_PATH;

const herdsEndpointPath = import.meta.env.VITE_HERDS_ENDPOINT_PATH;

/**
 * Handles HTTP requests for animals and farms.
 */
export class LivestockApi extends BaseApi {
    #animalsEndpoint;
    #herdsEndpoint;

    /**
     * Prepares animal and herd endpoints using environment variables.
     */
    constructor() {
        super();
        this.#animalsEndpoint = new BaseEndpoint(this, animalsEndpointPath);
        this.#herdsEndpoint = new BaseEndpoint(this, herdsEndpointPath);
    }

    /** @returns {Promise} Lists registered animals. */
    getAnimals() { return this.#animalsEndpoint.getAll(); }

    /** @param {number|string} id Animal identifier. @returns {Promise} */
    getAnimalById(id) { return this.#animalsEndpoint.getById(id); }

    /** @param {Object} resource Animal data. @returns {Promise} */
    createAnimal(resource) { return this.#animalsEndpoint.create(resource); }

    /** @param {Object} resource Updated animal data. @returns {Promise} */
    updateAnimal(resource) { return this.#animalsEndpoint.update(resource.id, resource); }

    /** @param {number|string} id Animal identifier. @returns {Promise} */
    deleteAnimal(id) { return this.#animalsEndpoint.delete(id); }

    /** @returns {Promise} Lists registered farms. */
    getHerds() { return this.#herdsEndpoint.getAll(); }

    /** @param {Object} resource Farm data. @returns {Promise} */
    createHerd(resource) { return this.#herdsEndpoint.create(resource); }

    /** @param {Object} resource Updated farm data. @returns {Promise} */
    updateHerd(resource) { return this.#herdsEndpoint.update(resource.id, resource); }

    /** @param {number|string} id Farm identifier. @returns {Promise} */
    deleteHerd(id) { return this.#herdsEndpoint.delete(id); }
}
