import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Pages/Navbar.tsx";
import ForgotPassword from "./app/ForgotPassword.tsx";
import ForgotUserName from "./app/ForgotUserName.tsx";
import HomePageChat from "./components/Pages/Chat/HomePageChat.tsx";
import { Provider } from "react-redux";
import AuthStore from "./store/Auth.Store.tsx";
import ProtectedRoutes from "./components/Pages/ProtectedRoutes.tsx";
import { Toaster } from "sonner";
const NavbarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
};
const RoutesArray = [
  {
    path: "/",
    element: <App />,
    allowAuthenticated: false,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    allowAuthenticated: false,
  },
  {
    path: "/forgot-username",
    element: <ForgotUserName />,
    allowAuthenticated: false,
  },
  {
    path: "/chat",
    element: <HomePageChat />,
    allowAuthenticated: true,
  },
];
createRoot(document.getElementById("root")!).render(
  <Provider store={AuthStore}>
    <BrowserRouter>
      <Routes>
        {RoutesArray.map((route) => (
          <Route
            path={route.path}
            key={route.path}
            element={
              <ProtectedRoutes allowAuthenticated={route.allowAuthenticated}>
                <NavbarWrapper>{route.element}</NavbarWrapper>
              </ProtectedRoutes>
            }
          />
        ))}
      </Routes>
      <Toaster />
    </BrowserRouter>
  </Provider>
);
