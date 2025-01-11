import React, { useEffect, useLayoutEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import AxiosInstance from "@/api/axios";
import { isAxiosError } from "axios";
import {
  AllmessageListType,
  APISuccessType,
  LoggedUserDataFromBackendType,
  previousChatType,
} from "@/lib/Types";
import ShowPreviousChatList from "./ShowPreviousChatList";
import OpenChat from "./OpenChat";
import { useAppSelector } from "@/store/Auth.Store";
import SearchUser from "./SearchUser";
import socket from "@/lib/socket";

const HomePageChat = () => {
  const [selectedChat, setSelectedChat] =
    React.useState<LoggedUserDataFromBackendType | null>(null);
  const [previousChats, setPreviousChats] = React.useState<previousChatType[]>(
    []
  );
  async function fetchChats() {
    try {
      const { data } = await AxiosInstance.get<
        APISuccessType<previousChatType[]>
      >(`/api/v1/messages/`);
      if (data.success) {
        setPreviousChats(data.data);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.error(error);
      }
    }
  }
  useAppSelector((state) => state.auth);
  useLayoutEffect(() => {
    fetchChats();
  }, []);
  const {user}=useAppSelector((state) => state.auth);
  const [isFetchingChats, setIsFetchingChats] = React.useState(false);
  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          setIsFetchingChats(true);
          const { data } = await AxiosInstance.get<
            APISuccessType<AllmessageListType[]>
          >(`/api/v1/messages/get-messages`, {
            headers: {
              receiver: selectedChat._id,
            },
          });
          if (data.success) setMessages(data.data);
        } catch (error) {
        } finally {
          setIsFetchingChats(false);
        }
      };
      fetchMessages();
    }
  }, [selectedChat]);
  useEffect(() => {
    const RefreshChatListener = (data: LoggedUserDataFromBackendType) => {
      console.log("refresh_previous_message",data)
      if(data._id===user?._id){
        fetchChats();
      }
    };
    socket.on("refresh_previous_message", RefreshChatListener);

    return () => {
      socket.off("refresh_previous_message", RefreshChatListener);
    };
  }, [previousChats, user?._id]);

  const HandleChatSelections = (chat: LoggedUserDataFromBackendType) => {
    console.log("click", chat);
    setSelectedChat({ ...chat });
  };
  const [messages, setMessages] = React.useState<AllmessageListType[]>([]);
  return (
    <div className="w-screen min-h-[500px] h-[80vh] flex justify-center items-center">
      <div className="w-4/5 min-h-[450px] grid grid-cols-6 rounded-lg shadow">
        <ScrollArea className="px-3 py-2 h-auto max-h-[450px] col-start-1 col-end-3 border flex flex-col items-between justify-between rounded-l-lg max-md:hidden">
          <SearchUser setSelectedChat={setSelectedChat} />
          {previousChats.map((chat) => {
            const ChatDetails = chat.user;
            return (
              <ShowPreviousChatList
                HandleChatSelections={HandleChatSelections}
                ChatDetails={ChatDetails}
                key={chat._id}
                chat={chat}
              />
            );
          })}
        </ScrollArea>
        <div className="px-3 py-2 max-h-[450px]  col-start-3 col-end-7 border max-md:col-start-1">
          {selectedChat ? (
            <OpenChat
              messages={messages}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              isFetchingChats={isFetchingChats}
              setMessages={setMessages}
              fetchChats={fetchChats}
            />
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
