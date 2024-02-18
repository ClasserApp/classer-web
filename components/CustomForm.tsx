"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { businessTypes } from "@/constants/BusinessTypes";
import { useCustomer } from "@/hooks/useCustomer";
import { CheckCircledIcon, CheckIcon } from "@radix-ui/react-icons";

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

const CustomForm = () => {
  const { createNewCustomer, isLoading, success } = useCustomer();
  // const [formData, setFormData] = useState<z.infer<typeof FormSchema>>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await createNewCustomer(data);
    } catch (error: any) {
      console.log("error");
    }
  }

  return (
    <div>
      {success ? (
        <div>
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <CheckCircledIcon color="#152d3f" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">תודה שנרשמתה</p>
              <p className="text-sm text-muted-foreground">אנו ניצור איתך קשר בקרוב</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                הרשמה
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CustomForm;
