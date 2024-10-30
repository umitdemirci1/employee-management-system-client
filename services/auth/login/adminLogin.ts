import Cookies from "js-cookie";
import { apiClientHelper } from "@/services/apiClientHelper";
import { AdminLoginRequest } from "@/types/adminLoginRequest";
import { AdminLoginResponse } from "@/types/adminLoginResponse";

export async function adminLogin(email: string, password: string): Promise<boolean> {
  const loginRequest: AdminLoginRequest = {
    email,
    password,
  };

  const result = await apiClientHelper.post<AdminLoginResponse>(
    "/Account/login/applicationmanager",
    loginRequest
  );

  if (result !== null) {
    Cookies.set("jwtToken", result.token);
    return true;
  }
  return false;
}
