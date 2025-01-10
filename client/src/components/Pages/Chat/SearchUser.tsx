import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { APISuccessType, LoggedUserDataFromBackendType } from "@/lib/Types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import AvatarProfile from "../AvatarProfile";
import { SearchUsers } from "@/lib/Mutations";
import useDebouncerhook from "@/hooks/useDebouncer";
const SearchUser = ({
  setSelectedChat,
}: {
  setSelectedChat: React.Dispatch<
    React.SetStateAction<LoggedUserDataFromBackendType | null>
  >;
}) => {
  const [search, setSearch] = React.useState<string>("");
  const [userList, setUserList] = React.useState<
    LoggedUserDataFromBackendType[] | []
  >([]);
  const debouceSearch = useDebouncerhook(search, 500);
  const [loading, setLoading] = React.useState<boolean>(false);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response: APISuccessType<LoggedUserDataFromBackendType[]> =
        await SearchUsers(debouceSearch);
      setLoading(false);
      if (response && response.success) {
        setUserList(response.data);
      }
    };
    if (debouceSearch.length > 2) {
      fetchUser();
    }
  }, [debouceSearch]);
  return (
    <React.Fragment>
      <div className="py-3 w-[98%] mx-auto">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search User"
          value={search}
          className="w-full bg-transparent px-3 py-2 border rounded-md focus:outline-[1px]"
          autoComplete="off"
          autoCorrect="off"
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading && (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner text-primary">
              Loading...
            </span>
          </div>
        )}
        {search && (
          <div className="flex flex-col gap-2 mt-2">
            {userList.length > 0 ? (
              userList.map((user) => {
                return (
                  <div
                    className="p-2 text-sm rounded-sm border flex items-center gap-3 hover:cursor-pointer"
                    onClick={() => {
                      setSelectedChat(user);
                      setSearch("");
                    }}
                    key={user._id}
                  >
                    <AvatarProfile
                      ImgSrc={user.imgSrc}
                      ImgAlt={user.name}
                      fallback={user.name}
                      AvatarClass="h-7 w-7"
                    />
                    <div className="w-[90%] flex flex-col items-start justify-start">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <p className="capitalize">{user.name}</p>
                          </TooltipTrigger>
                          <TooltipContent>Name</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <p className="capitalize">{user.username}</p>
                          </TooltipTrigger>
                          <TooltipContent>username</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-2 text-sm rounded-sm border flex items-center gap-3">
                <p className="text-sm">No User Found</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Separator />
    </React.Fragment>
  );
};

export default SearchUser;
