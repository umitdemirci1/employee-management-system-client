import CompanyLogin from "@/components/auth/company/CompanyLogin";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card className="w-[350px] mb-24">
        <CardHeader>
          <CardTitle>Login to company</CardTitle>
        </CardHeader>
        <CardContent>
          <CompanyLogin />
        </CardContent>
      </Card>
    </div>
  );
}
