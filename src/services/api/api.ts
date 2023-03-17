import axios from "axios";

export const Api = axios.create({
    baseURL: "http://10.0.2.2:8080",
    headers: {
        "Content-Type": "application/json",
    },
});