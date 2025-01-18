import ScrollableFeed from "react-scrollable-feed";
import AvatarProfile from "../AvatarProfile";
import { AllmessageListType } from "@/lib/Types";
import { useAppSelector } from "@/store/Auth.Store";
import React from "react";

const ShowMessages = React.memo(
  ({ messages }: { messages: AllmessageListType[] }) => {
    const { user } = useAppSelector((state) => state.auth);
    return (
      <ScrollableFeed className="!max-h-[calc(450px-60px)] overflow-y-auto p-4 flex flex-col gap-2">
        {messages.map((item) => {
          return (
            <div
              className={`flex gap-2 items-center scroll ${
                item.sender._id === user?._id
                  ? "justify-start flex-row-reverse"
                  : ""
              }`}
              key={item._id}
            >
              <AvatarProfile
                AvatarClass={"w-8 h-8"}
                ImgSrc={item.sender.imgSrc}
                ImgAlt={item.sender.name}
                fallback={item.sender.name}
              />
              <div
                className={`font-poppins flex flex-col gap-2 items-start justify-normal text-sm px-2 py-3 rounded-s-lg rounded-e-md ${
                  item.sender._id === user?._id
                    ? "bg-green-300 text-primary-foreground text-white shadow hover:bg-green-300/90"
                    : "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80"
                }`}
              >
                <span className="font-emoji text-md font-medium leading-none text-gray-900 dark:text-white">
                  {item.content}
                </span>
              </div>
            </div>
          );
        })}
      </ScrollableFeed>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison logic: shallow compare the message lists
    return (
      JSON.stringify(prevProps.messages) === JSON.stringify(nextProps.messages)
    );
  }
);

export default ShowMessages;
