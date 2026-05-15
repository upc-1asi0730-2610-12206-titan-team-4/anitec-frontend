import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const financialRecordsEndpointPath = import.meta.env.VITE_FINANCIAL_RECORDS_ENDPOINT_PATH;

/**
 * Handles HTTP requests for financial records.
 */
export class FinancialApi extends BaseApi {
    #recordsEndpoint;

    /**
     * Prepares the financial records endpoint.
     */
    constructor() {
        super();
        this.#recordsEndpoint = new BaseEndpoint(this, financialRecordsEndpointPath);
    }

    /** @returns {Promise} Lists financial records. */
    getRecords() { return this.#recordsEndpoint.getAll(); }

    /** @param {Object} resource Record data. @returns {Promise} */
    createRecord(resource) { return this.#recordsEndpoint.create(resource); }

    /** @param {Object} resource Updated record data. @returns {Promise} */
    updateRecord(resource) { return this.#recordsEndpoint.update(resource.id, resource); }

    /** @param {number|string} id Financial record identifier. @returns {Promise} */
    deleteRecord(id) { return this.#recordsEndpoint.delete(id); }
}
