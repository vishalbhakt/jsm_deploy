import axios from 'axios';

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = localStorage.getItem('refresh_token');
        if (refresh) {
          const res = await axios.post(`${API_BASE}/auth/token/refresh/`, { refresh });
          localStorage.setItem('access_token', res.data.access);
          original.headers.Authorization = `Bearer ${res.data.access}`;
          return api(original);
        }
      } catch {
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ── Auth ──
export const authAPI = {
  login: (data: { username: string; password: string }) => api.post('/auth/login/', data),
  register: (data: object) => api.post('/auth/register/', data),
  profile: () => api.get('/auth/profile/'),
};

// ── Dashboard ──
export const dashboardAPI = {
  stats: () => api.get('/dashboard/stats/'),
};

// ── CRUD factories ──
const crud = (resource: string) => ({
  list: (params?: object) => api.get(`/${resource}/`, { params }),
  get: (id: number) => api.get(`/${resource}/${id}/`),
  create: (data: object) => api.post(`/${resource}/`, data),
  update: (id: number, data: object) => api.put(`/${resource}/${id}/`, data),
  delete: (id: number) => api.delete(`/${resource}/${id}/`),
});

export const coursesAPI = crud('courses');
export const subjectsAPI = crud('subjects');
export const studentsAPI = crud('students');
export const teachersAPI = crud('teachers');
export const assignmentsAPI = crud('assignments');
export const attendanceAPI = crud('attendance');
export const paymentsAPI = crud('payments');
export const videoLecturesAPI = crud('video-lectures');
export const announcementsAPI = crud('announcements');
export const eventsAPI = crud('events');
export const galleryAPI = crud('gallery');
export const resultsAPI = crud('results');
export const notesAPI = crud('notes');
export const enquiriesAPI = crud('enquiries');
export const usersAPI = {
  ...crud('users'),
  approve: (id: number) => api.post(`/users/${id}/approve/`),
  pending: () => api.get('/users/pending/'),
};

export default api;
