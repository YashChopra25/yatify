import { ShowPreviousChatListPropsTypes } from "@/lib/Types";
import AvatarProfile from "../AvatarProfile";

const ShowPreviousChatList = ({
  ChatDetails,
  HandleChatSelections,
  chat,
}: ShowPreviousChatListPropsTypes) => {
  return (
    <div
      className="w-full px-2 py-3 border-y flex gap-3 cursor-pointer"
      onClick={() => HandleChatSelections(ChatDetails)}
      key={chat._id}
    >
      <AvatarProfile
        ImgSrc={ChatDetails?.imgSrc}
        ImgAlt={ChatDetails?.name}
        fallback={ChatDetails?.name}
      />
      <div className="w-full flex flex-col gap-2 items-start justify-normal">
        <p className="text-md font-medium leading-none text-gray-900 dark:text-white">
          {ChatDetails.username}
        </p>
        <span className="font-emoji text-xs text-muted-foreground line-clamp-1">
          {chat.latestMessage}
        </span>
      </div>
    </div>
  );
};

export default ShowPreviousChatList;
