import axios from "axios";

const BaseUrl = "http://127.0.0.1:3005/api";

const endPoint = {
    LOGIN: `${BaseUrl}/user/login`,
    SIGNUP: `${BaseUrl}/user/register`,
    BOOKS: `${BaseUrl}/book/all`,
    ME: `${BaseUrl}/user/currentUser`
}

const axiosInstance = axios.create({
    baseURL: BaseUrl,
});

export { endPoint, axiosInstance };