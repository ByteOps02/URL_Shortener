import api from "./api";

export const createShortUrl = (data) => api.post("/shorten", data);
export const getUserUrls = () => api.get("/codes");
export const deleteUrl = (id) => api.delete(`/${id}`);
