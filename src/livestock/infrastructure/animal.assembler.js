import { Animal } from "../domain/model/animal.entity.js";

/**
 * Converts data received from the API into Animal entities.
 */
export class AnimalAssembler {
    /**
     * Converts a simple resource into an Animal entity.
     * @param {Object} resource Animal data.
     * @returns {Animal}
     */
    static toEntityFromResource(resource) {
        return new Animal({ ...resource });
    }

    /**
     * Converts an HTTP response into a list of animals.
     * @param {Object} response API response.
     * @returns {Animal[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) return [];

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data.animals;
        return resources.map((resource) => this.toEntityFromResource(resource));
    }
}
