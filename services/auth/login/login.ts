import Cookies from "js-cookie";
import { apiClientHelper } from "@/services/apiClientHelper";
import { LoginRequest } from "@/types/loginRequest";
import { LoginResponse } from "@/types/loginResponse";

export async function login(email: string, password: string): Promise<boolean> {
  const companyId = Cookies.get("companyId");
  if (!companyId) {
    throw new Error("Company ID not found in cookies");
  }

  const loginRequest: LoginRequest = {
    companyId,
    email,
    password,
  };

  const result = await apiClientHelper.post<LoginResponse>(
    "/Account/login",
    loginRequest
  );

  if (result !== null) {
    Cookies.set("jwtToken", result.token);
    return true;
  }
  return false;
}
