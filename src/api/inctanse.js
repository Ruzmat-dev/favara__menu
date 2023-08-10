import axios from "axios";

export const inctanse = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
}) 