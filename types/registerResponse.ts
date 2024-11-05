export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: any;
  errors?: {
    [key: string]: string[] | string;
  };
}