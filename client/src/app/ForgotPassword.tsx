import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { emailValidator } from "@/lib/validations";
import InputField from "@/components/ui/InputField";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<{ email: string }>({ email: "" });
  const HandleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const HandleClick = () => {
    if (email.trim() === "") {
      setError({ email: "Email cannot be empty" });
      return;
    }
    if (!emailValidator.safeParse(email).success) {
      setError({ email: "Please Enter an Valid Email" });
      return;
    }
  };
  return (
    <div className="flex justify-center items-center my-6">
      <Card className="w-[444px]">
        <CardHeader>
          <CardTitle>Welcome to the Yatify</CardTitle>
          <CardDescription>
            Yeah!! You forgot your password,No worry You can easily Forgot your
            Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InputField
            HandleOnChangeInput={HandleOnChangeInput}
            data={email}
            errors={error}
            required={true}
            placeholder="Enter your email"
            type="email"
            name="email"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={HandleClick}>Forgot password</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
