import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { cn } from "@/lib/utils";

import Login from "./Login";
import CustomForm from "./CustomForm";
import Image from "next/image";

const SplitForm = () => {
  return (
    <div>
      <div
        className={cn("w-[400px] inline-flex h-9 items-center justify-center rounded-lg bg-muted p-14  text-muted-foreground")}
      >
        <Image src={"/logo.png"} height={120} width={120} alt={""} />
      </div>
      <Tabs defaultValue="signUp" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signUp">הרשמה</TabsTrigger>
          <TabsTrigger value="login">כניסה</TabsTrigger>
        </TabsList>
        <TabsContent value="signUp">
          <Card>
            <CardHeader>
              <CardTitle>הרשמה</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* <SignUpForm /> */}
              <CustomForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Login />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SplitForm;
