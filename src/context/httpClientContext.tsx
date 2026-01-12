import { createContext, useContext, type ReactNode } from "react";
import { httpClient } from "@/api/httpClient";
import type { AxiosInstance } from "axios";

export const HttpClientContext = createContext<AxiosInstance | undefined>(undefined);

interface HttpClientProviderProps {
  children: ReactNode;
}

export const HttpClientProvider = ({ children }: HttpClientProviderProps) => {
  return <HttpClientContext.Provider value={httpClient}>{children}</HttpClientContext.Provider>;
};

export const useHttpClient = (): AxiosInstance => {
  const context = useContext(HttpClientContext);
  if (context === undefined) {
    throw new Error("useHttpClient must be used within a HttpClientProvider");
  }
  return context as AxiosInstance;
};
