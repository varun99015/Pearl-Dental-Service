import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Response interceptor for consistent error handling
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ error: 'Request timed out. Please try again.' });
    }
    return Promise.reject({ error: 'Unable to connect to the server. Please check your connection.' });
  }
);

export const clinicApi = {
  getClinic: () => api.get('/clinic'),
  getServices: () => api.get('/services'),
  getDoctors: () => api.get('/doctors'),
  getFaqs: () => api.get('/faqs'),
  submitAppointment: (data) => api.post('/appointments', data),
  submitContact: (data) => api.post('/contact', data),
  healthCheck: () => api.get('/health'),
};

export default api;
