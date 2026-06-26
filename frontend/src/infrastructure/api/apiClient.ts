import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// intercepteur : ajoute automatiquement le token JWT a chaque requete
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//Intercepteur : redirige vers login et token expiré
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401){
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;