import axios from "axios"
import queryString from "query-string"

const baseURL = "http://127.0.0.1:5000/api/v1"
const publicClient = axios.create({
    baseURL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    }
})

publicClient.interceptors.request(async config => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
        }
    }
})