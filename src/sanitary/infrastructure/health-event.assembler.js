import { HealthEvent } from "../domain/model/health-event.entity.js";

/**
 * Converts data received from the API into HealthEvent entities.
 */
export class HealthEventAssembler {
    /**
     * Converts a simple resource into a HealthEvent entity.
     * @param {Object} resource Health record data.
     * @returns {HealthEvent}
     */
    static toEntityFromResource(resource) {
        return new HealthEvent({ ...resource });
    }

    /**
     * Converts an HTTP response into a list of health records.
     * @param {Object} response API response.
     * @returns {HealthEvent[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) return [];

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data["health-events"];
        return resources.map((resource) => this.toEntityFromResource(resource));
    }
}
