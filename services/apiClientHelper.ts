import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7161/api";

class ApiClientHelper {
  private static instance: ApiClientHelper;

  private constructor() {}

  public static getInstance(): ApiClientHelper {
    if (!ApiClientHelper.instance) {
      ApiClientHelper.instance = new ApiClientHelper();
    }
    return ApiClientHelper.instance;
  }

  private async createRequest(method: string, endpoint: string, body?: any): Promise<RequestInit> {
    const token = Cookies.get("jwtToken");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return options;
  }

  public async get<T>(endpoint: string): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = await this.createRequest("GET", endpoint);
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Network response was not ok");
    }
    return response.json();
  }

  public async post<T>(endpoint: string, body: any): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = await this.createRequest("POST", endpoint, body);
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Network response was not ok");
    }
    return response.json();
  }

  public async put<T>(endpoint: string, body: any): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = await this.createRequest("PUT", endpoint, body);
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Network response was not ok");
    }
    return response.json();
  }

  public async patch<T>(endpoint: string, body: any): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = await this.createRequest("PATCH", endpoint, body);
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Network response was not ok");
    }
    return response.json();
  }

  public async delete(endpoint: string): Promise<void> {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = await this.createRequest("DELETE", endpoint);
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Network response was not ok");
    }
  }
}

export const apiClientHelper = ApiClientHelper.getInstance();