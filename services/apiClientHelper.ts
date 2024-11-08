import Cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../types/apiResponse";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7161/api";

class ApiClientHelper {
  private static instance: ApiClientHelper;

  private constructor() {}

  public static getInstance(): ApiClientHelper {
    if (!ApiClientHelper.instance) {
      ApiClientHelper.instance = new ApiClientHelper();
    }
    return ApiClientHelper.instance;
  }

  private createRequestConfig(
    method: string,
    endpoint: string,
    body?: any
  ): AxiosRequestConfig {
    const token = Cookies.get("jwtToken");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config: AxiosRequestConfig = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers,
    };

    if (body) {
      config.data = body;
    }

    return config;
  }

  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const config = this.createRequestConfig("GET", endpoint);
    const response = await axios(config);
    return response.data;
  }

  public async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    const config = this.createRequestConfig("POST", endpoint, body);
    const response = await axios(config);
    return response.data;
  }

  public async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    const config = this.createRequestConfig("PUT", endpoint, body);
    const response = await axios(config);
    return response.data;
  }

  public async patch<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    const config = this.createRequestConfig("PATCH", endpoint, body);
    const response = await axios(config);
    return response.data;
  }

  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const config = this.createRequestConfig("DELETE", endpoint);
    const response = await axios(config);
    return response.data;
  }
}

export const apiClientHelper = ApiClientHelper.getInstance();
