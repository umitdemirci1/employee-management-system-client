import { apiClientHelper } from "@/services/apiClientHelper";
import { CompanyIdResponse } from "@/types/companyResponse";
import Cookies from "js-cookie";

export async function getCompanyId(companyName: string): Promise<boolean> {
  const result = await apiClientHelper.get<CompanyIdResponse>(
    `/Company/get-company-id?companyName=${companyName}`
  );
  if (result !== null) {
    Cookies.set("companyId", result.companyId, { expires: 7 });
    Cookies.set("companyName", companyName, { expires: 7 });
    return true;
  }
  return false;
}
