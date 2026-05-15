/**
 * Encapsulates common REST operations for an endpoint.
 */
export class BaseEndpoint {
    /**
     * Receives the base API and the resource path to query.
     * @param {BaseApi} baseApi Base API with Axios configured.
     * @param {string} endpointPath Endpoint path.
     */
    constructor(baseApi, endpointPath) {
        this.http = baseApi.http;
        this.endpointPath = endpointPath;
    }

    /**
     * Gets all records from the endpoint.
     * @returns {Promise}
     */
    getAll() {
        return this.http.get(this.endpointPath);
    }

    /**
     * Finds a record using its identifier.
     * @param {number|string} id Resource identifier.
     * @returns {Promise}
     */
    getById(id) {
        return this.http.get(`${this.endpointPath}/${id}`);
    }

    /**
     * Creates a new record in the endpoint.
     * @param {Object} resource Data to save.
     * @returns {Promise}
     */
    create(resource) {
        return this.http.post(this.endpointPath, resource);
    }

    /**
     * Updates an existing record.
     * @param {number|string} id Resource identifier.
     * @param {Object} resource Updated data.
     * @returns {Promise}
     */
    update(id, resource) {
        return this.http.put(`${this.endpointPath}/${id}`, resource);
    }

    /**
     * Deletes a record by its identifier.
     * @param {number|string} id Resource identifier.
     * @returns {Promise}
     */
    delete(id) {
        return this.http.delete(`${this.endpointPath}/${id}`);
    }
}
