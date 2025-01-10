import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/Auth.Store";
import Profile from "./Profile";
import AvatarProfile from "./AvatarProfile";
import { LogoutMutations } from "@/lib/Mutations";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/Auth.slice";

const ProfileDropDown = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const LogoutFn = async () => {
    const response = await LogoutMutations();
    if (response && response.success) {
      navigate("/");
      dispatch(logout());
    }
  };
  if (!user) return null;
  return (
    <div className="sm:ml-6 sm:block">
      <div className="flex space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <AvatarProfile
              ImgSrc={user.imgSrc}
              ImgAlt={user.name}
              fallback={user.name}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 origin-top-right" align="center">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Profile>Profile</Profile>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={LogoutFn}
            >
              Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProfileDropDown;
