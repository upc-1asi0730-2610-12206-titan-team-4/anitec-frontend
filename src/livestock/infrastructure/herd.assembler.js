import {Herd} from "../domain/model/herd.entity.js";

/**
 * Converts data received from the API into Herd entities.
 */
export class HerdAssembler {
    /**
     * Converts a simple resource into a Herd entity.
     * @param {Object} resource Farm data.
     * @returns {Herd}
     */
    static toEntityFromResource(resource) {
        return new Herd({...resource});
    }

    /**
     * Converts an HTTP response into a list of farms.
     * @param {Object} response API response.
     * @returns {Herd[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) return [];

        const resources = Array.isArray(response.data) ? response.data : response.data.herds;
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
