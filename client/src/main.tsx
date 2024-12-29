import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Pages/Navbar.tsx";
import ForgotPassword from "./app/ForgotPassword.tsx";
import ForgotUserName from "./app/ForgotUserName.tsx";
import HomePageChat from "./components/Pages/Chat/HomePageChat.tsx";

const NavbarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <NavbarWrapper>
            <App />
          </NavbarWrapper>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <NavbarWrapper>
            <ForgotPassword />
          </NavbarWrapper>
        }
      />
      <Route
        path="/forgot-username"
        element={
          <NavbarWrapper>
            <ForgotUserName />
          </NavbarWrapper>
        }
      />
      <Route
        path="/chat"
        element={
          <NavbarWrapper>
            <HomePageChat />
          </NavbarWrapper>
        }
      />
    </Routes>
  </BrowserRouter>
);
