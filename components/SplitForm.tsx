import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";

import Login from "./Login";
import CustomForm from "./CustomForm";

const SplitForm = () => {
  return (
    <div>
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
