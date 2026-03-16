import axios from 'axios';

const API_BASE = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';

const api = axios.create({\n  baseURL: API_BASE,\n  timeout: 10000,\n});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const patientsAPI = {
  getAll: () => api.get('/patients'),
  create: (data) => api.post('/patients', data),
};

export const doctorsAPI = {
  getAll: () => api.get('/doctors'),
  create: (data) => api.post('/doctors', data),
};

export const appointmentsAPI = {
  getAll: () => api.get('/appointments'),
  create: (data) => api.post('/appointments', data),
};

export const medicalRecordsAPI = {
  getAll: () => api.get('/medicalRecords'),
  create: (data) => api.post('/medicalRecords', data),
};

export const billingAPI = {
  getAll: () => api.get('/billing'),
  create: (data) => api.post('/billing', data),
};

export default api;

