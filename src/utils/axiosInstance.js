import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.calmind.site",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Izinkan pengiriman dan penerimaan cookie
});

export default axiosInstance;
