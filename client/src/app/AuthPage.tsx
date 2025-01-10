import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "../components/Pages/Login";
import Register from "../components/Pages/Register";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TabType } from "@/lib/Types";

const AuthPage = () => {
  const { search } = useLocation();

  const [initialTab, setInitialTab] = useState<TabType>("login");
  const ChangeURLParams = (tab: TabType) => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.href);
    setInitialTab(tab);
  };
  useEffect(() => {
    if (search) {
      const params = new URLSearchParams(search);
      const tab = params.get("tab");
      setInitialTab((tab as TabType) || "login");
    } else {
      // add tab in the url
      ChangeURLParams("login");
    }
  }, [search]);
  return (
    <Tabs
      value={initialTab}
      className="w-[400px]"
      onValueChange={(tab: TabType | string) => ChangeURLParams(tab as TabType)}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Login />
      </TabsContent>
      <TabsContent value="signup">
        <Register />
      </TabsContent>
    </Tabs>
  );
};

export default AuthPage;
