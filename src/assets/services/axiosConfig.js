
import axios from "axios";

const instance = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
   // Menambahkan header Authorization dengan Basic Authentication
   const username = 'yanax';
   const password = '123456';
   const authHeader = 'Basic ' + btoa(username + ':' + password);
   
   config.headers.Authorization = authHeader;

   return config;
}, (error) => {
   return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(
   (response) => {
      // Do something with response data
      return response;
   },
   (error) => {
      // Do something with response error
      return Promise.reject(error);
   }
);

export default instance;
