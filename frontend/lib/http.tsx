import axios from "axios";

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
        "Accept": 'application/json',
        "X-Requested-With": "XMLHttpRequest",
    }
});


export default http;