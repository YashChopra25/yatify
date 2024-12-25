import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginUserType, RegisterErrorType } from "@/lib/Types";
import { HandleLoginError } from "@/lib/validations";
import { useState } from "react";
import InputField from "../ui/InputField";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState<LoginUserType>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<RegisterErrorType>({});
  const HandleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const HandleRegister = () => {
    console.log(data);
    const errors = HandleLoginError(data, setErrors);
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
          You can login yourself to use the Yatify application for the chatting
          purpose...
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
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
          name="password"
          required
          type="text"
          placeholder="Enter your Password"
        />
        <div className="flex flex-col float-end">
          <Link to="/forgot-username" className="text-sm hover:underline">
            Forgot Username
          </Link>
          <Link to="/forgot-password" className="text-sm hover:underline">
            Forgot Password
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={HandleRegister}>Login</Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
