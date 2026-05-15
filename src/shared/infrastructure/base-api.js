import axios from "axios";

const platformApi = import.meta.env.VITE_ANITEC_API_URL;

/**
 * Configures the base HTTP connection shared by frontend APIs.
 */
export class BaseApi {
    #http;

    /**
     * Creates an Axios instance using the environment URL and adds the token when it exists.
     */
    constructor() {
        this.#http = axios.create({
            baseURL: platformApi,
            headers: { 'Content-Type': 'application/json'}
        });
        this.#http.interceptors.request.use((config) => {

            const token = localStorage.getItem('token');
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
    }

    /**
     * Returns the HTTP instance so endpoints can reuse it.
     * @returns {import('axios').AxiosInstance}
     */
    get http() {
        return this.#http;
    }
}
