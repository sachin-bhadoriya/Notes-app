import { configDotenv } from "dotenv";
import axios from "axios";
configDotenv()

const API = axios.create({
    baseURL: process.env.REACT_APP_API,
})
API.interceptors.request.use((req) => {

    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = token;
    }

    return req;

});
export default API;