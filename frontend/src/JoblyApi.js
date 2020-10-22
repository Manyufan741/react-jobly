import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
// const BASE_API_URL = "http://localhost:3001";

class JoblyApi {
    static async request(endpoint, paramsOrData = {}, verb = "get") {
        paramsOrData._token = (
            // for now, hardcode token for "testing"
            // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc" +
            // "3RpbmciLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU1MzcwMzE1M30." +
            // "COmFETEsTxN_VfIlgIKw0bYJLkvbRQNgO1XCSE8NZ0U"
            localStorage.getItem('token')
        );

        console.debug("API Call:", endpoint, paramsOrData, verb);

        try {
            return (await axios({
                method: verb,
                url: `${BASE_API_URL}/${endpoint}`,
                [verb === "get" ? "params" : "data"]: paramsOrData
            })).data;
            // axios sends query string data via the "params" key,
            // and request body data via the "data" key,
            // so the key we need depends on the HTTP verb
        }

        catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getCompanies(query) {
        const res = await this.request(`companies`, {search:query});
        return res.companies;
    }

    static async getCompany(handle) {
        const res = await this.request(`companies/${handle}`);
        return res.company;
    }

    static async getJobs(query, username) {
        const res = await this.request(`jobs`, {search: query, username:username});
        return res.jobs;
    }

    static async loadUserData(username) {
        const res = await this.request(`users/${username}`);
        // console.log("load user data =>", res);
        return res.user;
    }

    static async register(body) {
        const res = await this.request(`users`, body, "post");
        if (res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('userData', JSON.stringify(body));
        }
        return res;
    }

    static async login(body) {
        const res = await this.request(`login`, body, "post");
        if (res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('userData', JSON.stringify(body));
        }
        return res;        
    }

    static async update(body) {
        const username = body.username;
        delete body.username; //becaue the request body of patching user data cannot have username, but we need it to make the request in the first hand
        const res = await this.request(`users/${username}`, body, "patch");
        if (res.user) {
            localStorage.setItem('userData', JSON.stringify(res.user));
        }
        return res;
    }

    static async applyJob(body) {
        const id = body.id;
        const username = body.username;
        const res = await this.request(`jobs/${id}/apply`, { username: username }, "post");
        return res;
    }
}

export default JoblyApi;