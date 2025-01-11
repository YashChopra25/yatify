import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoggedUserDataFromBackendType } from "@/lib/Types";
import AvatarProfile from "../AvatarProfile";
const commonStyle = "text-center text-bold text-xl";
const ShowUserProfile = ({
  useInformation,
}: {
  useInformation: LoggedUserDataFromBackendType;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="p-1 ">Profile</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="flex flex-col items-center gap-3">
            <AvatarProfile
              AvatarClass="w-32 h-32 flex justify-center"
              ImgSrc={useInformation.imgSrc}
              ImgAlt={useInformation.name}
              fallback={useInformation.name}
            />
            <div>
              <p className={commonStyle}>{useInformation.name}</p>
              <p className={commonStyle}>{useInformation.username}</p>
              <p className={commonStyle}>{useInformation.email}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShowUserProfile;
