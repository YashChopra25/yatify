import "./App.css";
import React from "react";
import AuthPage from "./app/AuthPage";

function App() {
  return (
    <React.Fragment>
      <div className="w-full flex justify-center items-center my-6">
        <AuthPage />
      </div>
    </React.Fragment>
  );
}

export default App;
