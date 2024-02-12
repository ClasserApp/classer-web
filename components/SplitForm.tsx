import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { SignUpForm } from "./SignUpForm";
import Login from "./Login";

const SplitForm = () => {
  return (
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
            <SignUpForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Login />
      </TabsContent>
    </Tabs>
  );
};

export default SplitForm;
