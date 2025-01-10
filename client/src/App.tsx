import "./App.css";
import React from "react";
import AuthPage from "./app/AuthPage";

function App() {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Notification permission denied.");
      }
    });
  }
  return (
    <React.Fragment>
      <div className="w-full flex justify-center items-center my-6">
        <AuthPage />
      </div>
    </React.Fragment>
  );
}

export default App;
