import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api', // Default or env
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response, // Si la respuesta es OK, déjala pasar
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos reintentado aún
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 1. Llamar a tu endpoint de refresh
        // Nota: El refresh token suele ir en una Cookie HttpOnly para mayor seguridad
        const { data } = await axios.post('https://tu-api.com/auth/refresh');
        
        const newAccessToken = data.accessToken;
        
        // 2. Guardar el nuevo token (localStorage o estado)
        localStorage.setItem('token', newAccessToken);

        // 3. Actualizar el header de la petición original
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 4. Reintentar la petición original con el nuevo token
        return api(originalRequest);
      } catch (refreshError) {
        // Si el refresh falla, la sesión expiró totalmente
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
