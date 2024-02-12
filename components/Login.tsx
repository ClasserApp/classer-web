import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

const Login = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>התחברות למערכת</CardTitle>
          {/* <CardDescription>מערכת מתקדמת לניהול משרדי רו"ח</CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input id="current" type="password" placeholder="שם משתמש" />
          </div>
          <div className="space-y-1">
            <Input id="new" type="password" placeholder="סיסמה" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">התחבר</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
