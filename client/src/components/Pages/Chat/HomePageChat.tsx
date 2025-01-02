import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollableFeed from "react-scrollable-feed";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";
interface MessagesType {
  id: number;
  name: string;
  imgSrc: string;
  messages: string;
}
const previousChats = [
  {
    id: 1,
    name: "John Doe",
    imgSrc: "https://randomuser.me/api/portraits/men/1.jpg",
    messages: "Hey, how's everything going?",
  },
  {
    id: 2,
    name: "Jane Smith",
    imgSrc: "https://randomuser.me/api/portraits/women/2.jpg",
    messages: "Got your email! Let’s catch up soon!",
  },
  {
    id: 3,
    name: "Alex Brown",
    imgSrc: "https://randomuser.me/api/portraits/men/3.jpg",
    messages: "Can we schedule the meeting for tomorrow?",
  },
  {
    id: 4,
    name: "Lily James",
    imgSrc: "https://randomuser.me/api/portraits/women/4.jpg",
    messages: "Looking forward to the weekend! Any plans?",
  },
  {
    id: 5,
    name: "Michael Clark",
    imgSrc: "https://randomuser.me/api/portraits/men/5.jpg",
    messages: "Hey! Have you seen the latest episode of that show?",
  },
  {
    id: 6,
    name: "Olivia Martinez",
    imgSrc: "https://randomuser.me/api/portraits/women/6.jpg",
    messages: "I'm still waiting for the package to arrive.",
  },
  {
    id: 7,
    name: "David Lee",
    imgSrc: "https://randomuser.me/api/portraits/men/7.jpg",
    messages: "I will send over the documents by end of day.",
  },
  {
    id: 8,
    name: "Sophia Wilson",
    imgSrc: "https://randomuser.me/api/portraits/women/8.jpg",
    messages: "Just wanted to check in and see how you're doing.",
  },
  {
    id: 9,
    name: "Ethan King",
    imgSrc: "https://randomuser.me/api/portraits/men/9.jpg",
    messages: "I think we need to talk about the project next week.",
  },
  {
    id: 10,
    name: "Isabella Lopez",
    imgSrc: "https://randomuser.me/api/portraits/women/10.jpg",
    messages: "Let's meet up and catch up soon!",
  },
  {
    id: 11,
    name: "Lucas Turner",
    imgSrc: "https://randomuser.me/api/portraits/men/11.jpg",
    messages: "I tried reaching out, but I didn't hear back from you.",
  },
  {
    id: 12,
    name: "Charlotte Martinez",
    imgSrc: "https://randomuser.me/api/portraits/women/12.jpg",
    messages: "Sorry for the delay in response, I've been swamped!",
  },
  {
    id: 13,
    name: "Oliver Moore",
    imgSrc: "https://randomuser.me/api/portraits/men/13.jpg",
    messages: "Can we chat about the presentation tomorrow?",
  },
  {
    id: 14,
    name: "Amelia Taylor",
    imgSrc: "https://randomuser.me/api/portraits/women/14.jpg",
    messages: "Have you checked out the new movie at the theater?",
  },
  {
    id: 15,
    name: "James Hall",
    imgSrc: "https://randomuser.me/api/portraits/men/15.jpg",
    messages: "Let's catch up soon over coffee!",
  },
];
interface selectedChatType {
  id: number;
  name: string;
  imgSrc: string;
  message: string;
}
const messagesArray: MessagesType[] = [
  {
    message: "hey how are you",
    senderId: 1,
    receiverId: 2,
  },
  {
    message: "I am fine",
    senderId: 2,
    receiverId: 1,
  },
  {
    message: "I am fine",
    senderId: 1,
    receiverId: 2,
  },
  {
    message: "What are you doing",
    senderId: 2,
    receiverId: 1,
  },
  {
    message: "Nothing,tell me about yourself",
    senderId: 1,
    receiverId: 2,
  },
  {
    message: "let meet tomorrow",
    senderId: 2,
    receiverId: 1,
  },
];
const HomePageChat = () => {
  const [selectedChat, setSelectedChat] =
    React.useState<selectedChatType | null>(null);
  const HandleChatSelections = (chat: selectedChatType) => {
    setSelectedChat({ ...chat });
  };
  const [messageinput, setMessageinput] = React.useState<string>("");
  const [messages, setMessages] = React.useState<any>([...messagesArray]);
  const HandleMessageSend = () => {
    if (messageinput.trim().length === 0) {
      return;
    }
    setMessages([
      ...messages,
      { message: messageinput, senderId: 1, receiverId: 2 },
    ]);
    setMessageinput("");
  };
  return (
    <div className="w-screen h-[80vh] flex justify-center items-center">
      <div className="w-4/5 min-h-[450px] grid grid-cols-6 rounded-lg shadow">
        <ScrollArea className="h-auto max-h-[450px] col-start-1 col-end-3 border flex flex-col items-between justify-between rounded-l-lg max-md:hidden">
          {previousChats.map((item) => {
            return (
              <div
                className="w-full px-2 py-3 border-y flex gap-3 cursor-pointer"
                onClick={() => HandleChatSelections(item)}
              >
                <Avatar>
                  <AvatarImage src={item.imgSrc} alt={item.name} />
                  <AvatarFallback>
                    {item.name
                      .split(" ")
                      .map((char) => char[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full flex flex-col gap-2 items-start justify-normal">
                  <p className="text-md font-medium leading-none text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className=" text-xs text-muted-foreground line-clamp-1">
                    {item.messages}
                  </p>
                </div>
              </div>
            );
          })}
        </ScrollArea>
        <div className="px-1 py-2 col-start-3 col-end-7 border max-md:col-start-1">
          {selectedChat ? (
            <ContextMenu>
              <ContextMenuTrigger>
                <div className="h-full flex flex-col">
                  <div className="px-3 py-1 flex gap-3 items-center h-14 border-b">
                    <Avatar>
                      <AvatarImage
                        src={selectedChat?.imgSrc}
                        alt={selectedChat?.name}
                      />
                      <AvatarFallback>{selectedChat?.name}</AvatarFallback>
                    </Avatar>
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
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <ScrollableFeed className="!max-h-[calc(450px-60px)] overflow-y-auto p-4 flex flex-col gap-2">
                    {messages.map((item) => {
                      return (
                        <div
                          className={`flex gap-2 items-center scroll ${
                            item.senderId === 1
                              ? "justify-start flex-row-reverse"
                              : ""
                          }`}
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={
                                item.senderId === 1
                                  ? selectedChat?.imgSrc
                                  : "https://randomuser.me/api/portraits/women/1.jpg"
                              }
                              alt={selectedChat?.name}
                            />
                            <AvatarFallback>
                              {selectedChat?.name}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`font-poppins flex flex-col gap-2 items-start justify-normal text-sm px-2 py-3 rounded-s-lg rounded-e-md ${
                              item.senderId === 1
                                ? "bg-green-300 text-primary-foreground text-white shadow hover:bg-green-300/90"
                                : "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80"
                            }`}
                          >
                            <p className="text-md font-medium leading-none text-gray-900 dark:text-white">
                              {item.message}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </ScrollableFeed>
                  <div>
                    <div className="flex justify-center items-end w-full gap-2">
                      <input
                        placeholder="Type your message here."
                        className="w-full bg-transparent px-3 py-2 border rounded-md focus:outline-[1px]"
                        value={messageinput}
                        onChange={(e) => setMessageinput(e.target.value)}
                      />
                      <Button
                        className=""
                        size={"sm"}
                        onClick={HandleMessageSend}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => setSelectedChat(null)}
                  className="capitalize"
                >
                  close chat
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ) : (
            <div className="px-3 py-1 flex gap-3 items-center h-full justify-center ">
              No Chat to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageChat;
