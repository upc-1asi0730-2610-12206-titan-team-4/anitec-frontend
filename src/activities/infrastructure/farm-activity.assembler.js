import { FarmActivity } from "../domain/model/farm-activity.entity.js";

/**
 * Converts data received from the API into FarmActivity entities.
 */
export class FarmActivityAssembler {
    /**
     * Converts a simple resource into a FarmActivity entity.
     * @param {Object} resource Activity data.
     * @returns {FarmActivity}
     */
    static toEntityFromResource(resource) {
        return new FarmActivity({ ...resource });
    }

    /**
     * Converts an HTTP response into a list of activities.
     * @param {Object} response API response.
     * @returns {FarmActivity[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) return [];

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data["farm-events"];
        return resources.map((resource) => this.toEntityFromResource(resource));
    }
}
