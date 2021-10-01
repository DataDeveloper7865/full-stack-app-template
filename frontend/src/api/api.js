import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080"

class HomesApi {

    //General request Method
    static async request(endpoint, data = {}, method = "get") {
        console.log("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = {};
        const params = (method === "get") ? data : {};

        try {
            return (await axios({url, method, data, params, headers})).data;
        } catch(err) {
            console.log("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // ROUTES:

    /**  Get all of the homes from server */

    static async getAllHomes() {
        let res = await this.request(`api/homes`);
        console.log("Data from server", res);
        return res;
    }

    /** Post a new home */

    static async postAHome(data) {
        let res = await this.request(`api/homes`, data, "post");
        console.log("Data from server", res);
        return res;
    }

    /** Get the current user */

    static async getCurrentUser(username) {
        let res = await this.request(`api/users/${username}`);
        console.log("Data from server", res);
        return res;
    }

    /** Get the token for login from username and password */

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Signup for the site */

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }


}

export default HomesApi;