import { Card, CardContent, CardHeader } from "@/components/ui/card";

const PendingVerificationPage: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-[350px] mb-24">
        <CardHeader>Account is in approval stage</CardHeader>
        <CardContent>
          Your approval is pending. You will receive an email once your account
          has been approved.
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingVerificationPage;
