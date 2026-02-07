import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import * as Sentry from "@sentry/react-native";
import { useCallback, useEffect } from "react";
import Constants from "expo-constants";

const getApiUrl = () => {
  if (__DEV__) {
    // For development, use your machine's IP address
    const { expoConfig } = Constants;
    const debuggerHost = expoConfig?.hostUri?.split(':').shift();
    
    if (debuggerHost) {
      return `http://${debuggerHost}:3000/api`;
    }
    
    // Fallback for different environments
    return process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:3000/api"; // For Android emulator default
  }
  
  // Production URL
  return process.env.EXPO_PUBLIC_API_URL || "https://your-production-url.com/api";
};

const API_URL = getApiUrl();

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

let tokenGetter: (() => Promise<string | null>) | null = null;

// Request interceptor - set up once
api.interceptors.request.use(async (config) => {
  if (tokenGetter) {
    const token = await tokenGetter();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor - set up once
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      Sentry.logger.error(
        `API request failed: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        { 
          status: error.response.status, 
          endpoint: error.config?.url, 
          method: error.config?.method 
        }
      );
    } else if (error.request) {
      Sentry.logger.warn("API request failed - no response", {
        endpoint: error.config?.url,
        method: error.config?.method,
      });
    }
    return Promise.reject(error);
  }
);

export const useApi = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    tokenGetter = getToken;
    return () => {
      tokenGetter = null;
    };
  }, [getToken]);

  const apiWithAuth = useCallback(
    async <T>(config: Parameters<typeof api.request>[0]) => {
      const token = await getToken();
      return api.request<T>({
        ...config,
        headers: { 
          ...config.headers, 
          ...(token && { Authorization: `Bearer ${token}` }) 
        },
      });
    },
    [getToken]
  );

  return { api, apiWithAuth };
};