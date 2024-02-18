import { useToast } from "@/components/ui/use-toast";
import * as customerService from "@/services/customerService";
import { useState } from "react";
import { z } from "zod";
import { FormSchema } from "@/components/CustomForm";
import { newCustomerRequest } from "@/services/requestFactory";

export const useCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const createNewCustomer = async (newCustomerData: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const requestData = newCustomerRequest(newCustomerData);

      const result = await customerService.createCustomer(requestData);
      if (result.success && result.data) {
        setSuccess(true);
        console.log("ok");
        toast({
          title: "לקוח נוצר בהצלחה!",
        });
      } else {
        setSuccess(false);
        console.log("data", result);
        toast({
          variant: "destructive",
          title: "משהו השתבש",
          description: "התרחשה בעייה בעת יצירת חשבון",
        });
      }
    } catch (error) {
      console.error("create client error:", error);
      toast({
        variant: "destructive",
        title: "משהו השתבש",
        description: "התרחשה בעייה בעת יצירת חשבון",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createNewCustomer, success };
};
