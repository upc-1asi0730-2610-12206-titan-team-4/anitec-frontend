import { FinancialRecord } from "../domain/model/financial-record.entity.js";

/**
 * Converts data received from the API into FinancialRecord entities.
 */
export class FinancialRecordAssembler {
    /**
     * Converts a simple resource into a FinancialRecord entity.
     * @param {Object} resource Financial record data.
     * @returns {FinancialRecord}
     */
    static toEntityFromResource(resource) {
        return new FinancialRecord({ ...resource });
    }

    /**
     * Converts an HTTP response into a list of financial records.
     * @param {Object} response API response.
     * @returns {FinancialRecord[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) return [];

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data["financial-records"];
        return resources.map((resource) => this.toEntityFromResource(resource));
    }
}
