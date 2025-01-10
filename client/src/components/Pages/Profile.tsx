import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "../ui/InputField";
import { useState } from "react";
import { ProfileProps } from "@/lib/Types";
import { updateProfileMutation } from "@/lib/Mutations";
import { HandlerToaster } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/Auth.Store";
import { login } from "@/store/Auth.slice";
import { toast } from "sonner";

const Profile = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ProfileProps>({
    username: "",
    name: "",
    email: "",
  });
  const HandleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const HandleRegister = async () => {
    toast.loading("Updating profile...", {
      id: "updateProfile",
    });
    const response = await updateProfileMutation(data);
    toast.dismiss("updateProfile");
    if (response && !response.success) {
      HandlerToaster(response.message, "error");
      return;
    }
    if (response) dispatch(login(response.data));
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button variant="ghost" className="w-full justify-start">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
            <InputField
              HandleOnChangeInput={HandleOnChangeInput}
              data={data}
              name="name"
              required={false}
              type="text"
              placeholder={`${user?.name}` || "Enter your Name"}
            />
            <InputField
              HandleOnChangeInput={HandleOnChangeInput}
              data={data}
              name="username"
              required={false}
              type="text"
              placeholder={`${user?.username}` || "Enter your Username"}
            />
            <InputField
              HandleOnChangeInput={HandleOnChangeInput}
              data={data}
              name="email"
              required={false}
              type="email"
              placeholder={`${user?.email}` || "Enter your Email"}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={HandleRegister}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default Profile;
