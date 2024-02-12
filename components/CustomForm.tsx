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
  const [formData, setFormData] = useState<z.infer<typeof FormSchema>>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormData(data);
    await createCustomer(data);
    console.log(data);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 ">
          <ScrollArea className=" h-1/3 w-full ">
            {fieldDefinitions.map(({ name, label, placeholder, component: Component }) => (
              <FormField
                key={name}
                name={name}
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
                              return <SelectItem value={item.type}>{item.typeAsString}</SelectItem>;
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
  );
};

export default CustomForm;
