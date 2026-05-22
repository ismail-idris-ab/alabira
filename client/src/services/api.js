import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err.response?.data?.message || err.message);
    return Promise.reject(err);
  }
);

export const productsApi = {
  list: (params) => api.get("/products", { params }),
};

export const testimonialsApi = {
  list: () => api.get("/testimonials"),
};

export const contactApi = {
  submit: (data) => api.post("/contact", data),
};

export const newsletterApi = {
  subscribe: (email) => api.post("/newsletter/subscribe", { email }),
};

export default api;
