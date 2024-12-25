import { LoginUserType, RegisterErrorType, RegisterUserType } from "./Types";
import { z } from "zod";

export const emailValidator = z.string().trim().email({
  message: "Please Enter an Valid Email",
});
export const HandleRegisterError = (
  UserData: RegisterUserType,
  setterFn: React.Dispatch<React.SetStateAction<RegisterErrorType>>
) => {
  const errors: { [name: string]: string } = {};
  if (UserData.name.trim() === "") {
    errors.name = "Name is required";
  }
  if (UserData.username.trim() === "") {
    errors.username = "Username is required";
  }
  if (UserData.email.trim() === "") {
    errors.email = "Email is required";
  }
  if (
    UserData.email.trim() &&
    !emailValidator.safeParse(UserData.email).success
  ) {
    errors.email = "Please Enter an Valid Email";
  }
  if (UserData.password.trim() === "") {
    errors.password = "Password is required";
  }
  if (UserData.password.trim() !== "" && UserData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  if (UserData.password !== UserData.confirm_password) {
    errors.confirm_password = "Password and confirm password does not match";
  }
  if (UserData.confirm_password.trim() === "") {
    errors.confirm_password = "Confirm password is required";
  }

  setterFn(errors);
  return errors;
};
export const HandleLoginError = (
  UserData: LoginUserType,
  setterFn: React.Dispatch<React.SetStateAction<RegisterErrorType>>
) => {
  const errors: { [name: string]: string } = {};

  if (UserData.username.trim() === "") {
    errors.username = "Username is required";
  }
  if (UserData.password.trim() === "") {
    errors.password = "Password is required";
  }
  setterFn(errors);
  return errors;
};
