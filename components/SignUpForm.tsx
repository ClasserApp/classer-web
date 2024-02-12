"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { businessTypes } from "@/constants/BusinessTypes";
import { customerActivityTypes } from "@/constants/ActivityTypes";
const BusinessTypes = businessTypes;
const CustomerActivityTypes = customerActivityTypes;

const FormSchema = z.object({
  OwnerEntryName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  OwnerEntryLastName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z
    .number()
    .min(10, {
      message: "Username must be at least 2 characters.",
    })
    .max(10),
  OwnerEntryIdentity: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // password: z.string().min(1, {
  //   message: "Password must be at least 1 characters.",
  // }),

  // ContactMail: z.string().min(1, {
  //   message: "Password must be at least 1 characters.",
  // }),
  // OwnerEntryIdentity: z.string().min(1, {
  //   message: "Password must be at least 1 characters.",
  // }),
  // OwnerEntryBD: z.string().min(1, {
  //   message: "Password must be at least 1 characters.",
  // }),
  businessType: z.string().min(1, {
    message: "Password must be at least 1 characters.",
  }),
  customerActivityTypeId: z.string().min(1, {
    message: "Password must be at least 1 characters.",
  }),
  businessNumber: z.string().min(1, {
    message: "Password must be at least 1 characters.",
  }),
  incomeTaxFileNumber: z.string().min(1, {
    message: "Password must be at least 1 characters.",
  }),
});

export function SignUpForm() {
  const [formData, setFormData] = useState<z.infer<typeof FormSchema>>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      OwnerEntryName: "",
      OwnerEntryLastName: "",
      phone: 0,
      OwnerEntryIdentity: "",
      // OwnerEntryBD: "",
      businessType: "",
      customerActivityTypeId: "",
      businessNumber: "",
      incomeTaxFileNumber: "",
    },
  });

  useEffect(() => {
    console.log(JSON.stringify(formData, null, 2));
  }, [formData]);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormData(data);
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 ">
        <ScrollArea className=" h-1/3 w-full ">
          <FormField
            control={form.control}
            name="OwnerEntryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>שם פרטי</FormLabel>
                <FormControl>
                  <Input placeholder="שם פרטי" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="OwnerEntryLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>שם משפחה</FormLabel>
                <FormControl>
                  <Input placeholder="שם משפחה" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>טלפון</FormLabel>
                <FormControl>
                  <Input placeholder="טלפון" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="OwnerEntryIdentity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>תעודת זהות</FormLabel>
                <FormControl>
                  <Input placeholder="תעודת זהות" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>סוג העסק</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="סוג העסק" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BusinessTypes.map((item) => {
                        return <SelectItem value={item.type}>{item.typeAsString}</SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 
          <FormField
            control={form.control}
            name="customerActivityTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>תחום עיסוק</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="סוג העסק" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CustomerActivityTypes.map((item) => {
                        return <SelectItem value={item.id}>{item.description}</SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="businessNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>מספר העוסק / ח.פ</FormLabel>
                <FormControl>
                  <Input placeholder="מספר העוסק / ח.פ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />
        </ScrollArea>
        <Button type="submit" className="w-full">
          הרשמה
        </Button>
        <div>
          {formData && (
            <>
              <p>Username: {formData.businessType}</p>
              {/* <p>Password: {formData.password}</p> */}
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
