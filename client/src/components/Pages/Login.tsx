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
import { Link, useNavigate } from "react-router-dom";
import { LoginMutations } from "@/lib/Mutations";
import { HandlerToaster } from "@/lib/utils";
import { useAppDispatch } from "@/store/Auth.Store";
import { login } from "@/store/Auth.slice";
import { toast } from "sonner";
const Login = () => {
  const [data, setData] = useState<LoginUserType>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<RegisterErrorType>({});
  const HandleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const HandleLogin = async () => {
    const errors = HandleLoginError(data, setErrors);
    if (Object.keys(errors).length != 0) {
      return;
    }

    toast.loading("Loggin in...", {
      id: "login",
    });
    const response = await LoginMutations(data);
    toast.dismiss("login");
    if (response && !response.success) {
      HandlerToaster(response.message, "error");
      return;
    }
    if (response?.data) {
      dispatch(login(response.data));
      navigate("/chat");
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              HandleLogin();
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              HandleLogin();
            }
          }}
        />
        <div className="flex flex-col float-end">
          <Link to="/forgot-username" className="text-sm hover:underline">
            Forgot Username?
          </Link>
          <Link to="/forgot-password" className="text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={HandleLogin}>Login</Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
