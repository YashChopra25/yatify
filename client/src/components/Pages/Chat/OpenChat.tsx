import React, { useEffect } from "react";
import { useAppSelector } from "@/store/Auth.Store";
import { Button } from "@/components/ui/button";
import { AllmessageListType, LoggedUserDataFromBackendType } from "@/lib/Types";
import { SendMessageMutations } from "@/lib/Mutations";
import { HandlerToaster } from "@/lib/utils";
import socket from "@/lib/socket";
import ShowMessages from "./ShowMessages";
import AvatarProfile from "../AvatarProfile";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import ShowUserProfile from "./ShowUserProfile";

interface OpenChatPropsTypes {
  selectedChat: LoggedUserDataFromBackendType | null;
  messages: AllmessageListType[];
  setSelectedChat: React.Dispatch<
    React.SetStateAction<LoggedUserDataFromBackendType | null>
  >;
  setMessages: React.Dispatch<React.SetStateAction<AllmessageListType[]>>;
  fetchChats: () => Promise<void>;
  isFetchingChats: boolean;
}

const OpenChat = React.memo(
  ({
    selectedChat,
    messages,
    setSelectedChat,
    isFetchingChats,
    setMessages,
    fetchChats,
  }: OpenChatPropsTypes) => {
    const [messageinput, setMessageinput] = React.useState<string>("");
    useAppSelector((state) => state.auth);

    const HandleMessageSend = async () => {
      if (messageinput.trim().length === 0) return;

      const response = await SendMessageMutations({
        message: messageinput,
        receiver: selectedChat,
      });

      if (response && !response.success) {
        HandlerToaster(response.message, "error");
        return;
      }

      if (response) {
        socket.emit("message", response.data);
        setMessageinput(""); // Clear the input field
      }
    };
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
      const messageListener = (data: AllmessageListType) => {
        console.log("revcv", data);
        if (user?._id === data.sender._id || user?._id === data.receiver._id)
          fetchChats();
        if (
          (selectedChat?._id === data.sender._id &&
            user?._id === data.receiver._id) ||
          (selectedChat?._id === data.receiver._id &&
            user?._id === data.sender._id)
        ) {
          setMessages((prev) => [...prev, data]);
        }
      };

      socket.on("receive_message", messageListener);

      return () => {
        socket.off("receive_message", messageListener);
      };
    }, [fetchChats, setMessages, selectedChat, user?._id]);

    if (selectedChat === null)
      return <div>Select a chat to start messaging</div>;

    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="h-full flex flex-col">
            <div className="px-3 py-1 flex gap-3 items-center h-14 border-b">
              <AvatarProfile
                AvatarClass=""
                ImgSrc={selectedChat?.imgSrc}
                ImgAlt={selectedChat?.name}
                fallback={selectedChat?.name}
              />
              <div className="w-full flex flex-col gap-2 items-start justify-normal">
                <p className="text-md font-medium leading-none text-gray-900 dark:text-white">
                  {selectedChat?.name}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <ShowUserProfile useInformation={selectedChat} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {isFetchingChats ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-md font-medium leading-none text-gray-900 dark:text-white">
                  Fetching the chats...
                </p>
              </div>
            ) : (
              <React.Fragment>
                <ShowMessages messages={messages} />
                <div className="flex justify-center items-end w-full gap-2">
                  <input
                    placeholder="Type your message here."
                    className="w-full bg-transparent px-3 py-2 border rounded-md focus:outline-[1px]"
                    value={messageinput}
                    onChange={(e) => setMessageinput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        HandleMessageSend();
                      }
                    }}
                  />
                  <Button className="" size={"sm"} onClick={HandleMessageSend}>
                    Send
                  </Button>
                </div>
              </React.Fragment>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={() => setSelectedChat(null)}
            className="capitalize"
          >
            Close chat
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  }
);

export default OpenChat;
