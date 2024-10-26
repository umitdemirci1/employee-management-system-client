"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getCompanyId } from "@/services/auth/login/companyId";

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
});

export default function CompanyLogin() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const isOk = await getCompanyId(values.companyName);
      if (isOk) {
        router.push(`/auth/${values.companyName}/login`);
      } else {
        form.setError("companyName", {
          type: "manual",
          message: "Company ID could not be retrieved. Please try again.",
        });
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      form.setError("companyName", {
        type: "manual",
        message:
          "There was a problem with the fetch operation. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your EMS Domain to login</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input placeholder="companydomain" {...field} />
                  <span className="ml-2">.ems.com</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}
