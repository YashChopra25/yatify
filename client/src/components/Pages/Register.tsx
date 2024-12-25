import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InputField from "../ui/InputField";
import { RegisterUserType, RegisterErrorType } from "@/lib/Types";
import { HandleRegisterError } from "@/lib/validations";

const Register = () => {
  const [data, setData] = useState<RegisterUserType>({
    username: "",
    password: "",
    name: "",
    email: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<RegisterErrorType>({});
  const HandleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const HandleRegister = () => {
    console.log(data);
    const errors = HandleRegisterError(data, setErrors);
    if (Object.keys(errors).length != 0) {
      console.log(errors);
      return;
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to the Yatify</CardTitle>
        <CardDescription>
          You can register yourself to use the Yatify application for the
          chatting purpose...
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <InputField
          HandleOnChangeInput={HandleOnChangeInput}
          data={data}
          errors={errors}
          name="name"
          required
          type="text"
          placeholder="Enter your name"
        />
        <InputField
          HandleOnChangeInput={HandleOnChangeInput}
          data={data}
          errors={errors}
          name="username"
          required
          type="text"
          placeholder="Enter your Username"
        />
        <InputField
          HandleOnChangeInput={HandleOnChangeInput}
          data={data}
          errors={errors}
          name="email"
          required
          type="email"
          placeholder="Enter your Email"
        />
        <InputField
          HandleOnChangeInput={HandleOnChangeInput}
          data={data}
          errors={errors}
          name="password"
          required
          type="text"
          placeholder="Enter your Password"
        />
        <InputField
          HandleOnChangeInput={HandleOnChangeInput}
          data={data}
          errors={errors}
          name="confirm_password"
          required
          type="text"
          placeholder="Enter your confirm password"
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={HandleRegister}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              HandleRegister();
            }
          }}
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Register;
