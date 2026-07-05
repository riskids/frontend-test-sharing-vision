import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getAllArticles(limit = 100, offset = 0) {
  const response = await api.get(`/article/${limit}/${offset}`);
  return response.data;
}

export async function getArticleById(id) {
  const response = await api.get(`/article/detail/${id}`);
  return response.data;
}

export async function createArticle(data) {
  const response = await api.post('/article/', data);
  return response.data;
}

export async function updateArticle(id, data) {
  const response = await api.put(`/article/${id}`, data);
  return response.data;
}

export async function deleteArticle(id) {
  const response = await api.delete(`/article/${id}`);
  return response.data;
}