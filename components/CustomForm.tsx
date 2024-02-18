"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { businessTypes } from "@/constants/BusinessTypes";
import { createCustomer } from "@/lib/httpx";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

const fieldDefinitions = [
  { name: "OwnerEntryName", label: "שם פרטי", placeholder: "שם פרטי", component: Input },
  { name: "OwnerEntryLastName", label: "שם משפחה", placeholder: "שם משפחה", component: Input },
  { name: "phone", label: "טלפון", placeholder: "טלפון", component: Input },
  { name: "OwnerEntryIdentity", label: "תעודת זהות", placeholder: "תעודת זהות", component: Input },
  { name: "businessType", label: "סוג העסק", placeholder: "סוג העסק", component: SelectValue },
  { name: "email", label: "מייל", placeholder: "מייל", component: Input },
];

const defaultValues = {
  OwnerEntryName: "",
  OwnerEntryLastName: "",
  phone: "",
  OwnerEntryIdentity: "",
  businessType: "",
  email: "",
  //   customerActivityTypeId: "",
  //   businessNumber: "",
  //   incomeTaxFileNumber: "",
};

export const FormSchema = z.object({
  OwnerEntryName: z.string().min(2, {
    message: "שם הפרטי חייב להיות לפחות 2 תווים.",
  }),
  OwnerEntryLastName: z.string().min(2, {
    message: "שם המשפחה חייב להיות לפחות 2 תווים.",
  }),
  phone: z
    .string()
    .min(10, {
      message: "מספר הטלפון חייב להיות לפחות 10 תווים.",
    })
    .max(15, {
      message: "מספר הטלפון לא יכול לעלות על 15 תווים.",
    }),
  OwnerEntryIdentity: z.string().regex(/^\d{9}$/, {
    message: "תעודת הזהות חייבת להיות בדיוק 9 ספרות.",
  }),
  businessType: z.string().min(1, {
    message: "יש לבחור סוג עסק.",
  }),

  email: z.string().email({
    message: 'הדוא"ל אינו בפורמט תקין.', // Custom error message for invalid email format
  }),

  // businessNumber: z.string().min(1, {
  //   message: "יש להזין מספר עסק.",
  // }),
  // incomeTaxFileNumber: z.string().min(1, {
  //   message: "יש להזין מספר תיק מס הכנסה.",
  // }),
});

// The adjustments in defaultValues for the useForm hook remain unchanged.

const CustomForm = () => {
  const [operationSuccess, setOperationSuccess] = useState(false);
  const [operationMessage, setOperationMessage] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState<z.infer<typeof FormSchema>>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await createCustomer(data);
      setOperationSuccess(true);
      // setOperationMessage(response.message); // Assuming the message is directly in response
      console.log(response); // Log the response or handle it as needed
    } catch (error: any) {
      // Catch block to handle any type of error
      let errorMessage = "Failed to create customer."; // Default error message

      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        if (error.response) {
          // Server responded with a status code that falls out of the range of 2xx
          const message = error.response.data?.message || error.response.statusText;
          errorMessage = `Server responded with an error: ${message}`;
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = "No response received from the server.";
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        // Handle non-Axios (generic) errors
        errorMessage = error.message;
      }

      // It might be beneficial to introduce a retry mechanism here for certain types of errors
      // For instance, if it's a network error or a 503 Service Unavailable error

      setOperationSuccess(true);
      setOperationMessage(errorMessage);
      console.error("Error during customer creation: ", errorMessage);
    }
  }

  const AlertDestructive = () => (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>שגיאה</AlertTitle>
      <AlertDescription>{operationMessage}</AlertDescription>
    </Alert>
  );

  const SuccessComponent = () => (
    <Alert>
      {/* <RocketIcon className="h-4 w-4" /> */}
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  );
  return (
    <div>
      <div>
        {operationMessage ? <AlertDestructive /> : null}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 ">
            <ScrollArea className=" h-1/3 w-full mb-6">
              {fieldDefinitions.map(({ name, label, placeholder, component: Component }) => (
                <FormField
                  key={name}
                  name={
                    name as "OwnerEntryName" | "OwnerEntryLastName" | "phone" | "OwnerEntryIdentity" | "businessType" | "email"
                  }
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>

                      {Component == SelectValue ? (
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="סוג העסק" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {businessTypes.map((item) => {
                                return (
                                  <SelectItem key={item.type} value={item.type}>
                                    {item.typeAsString}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      ) : (
                        <FormControl>
                          <Component {...field} placeholder={placeholder} />
                        </FormControl>
                      )}

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </ScrollArea>
            <Button type="submit" className="w-full">
              הרשמה
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CustomForm;
