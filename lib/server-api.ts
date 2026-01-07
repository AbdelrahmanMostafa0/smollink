import axios from "axios";
import { cookies } from "next/headers";

// Create an Axios instance for server-side requests
const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api`
    : "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token from cookies
serverApi.interceptors.request.use(
  async (config) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // cookies() might fail if called outside of a request context (e.g. static generation)
      // We ignore the error and proceed without the token in that case
      console.warn("Could not retrieve cookies for server request:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default serverApi;
