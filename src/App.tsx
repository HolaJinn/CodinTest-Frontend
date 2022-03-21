import React from "react";
import "./App.css";
import AuthRoutes from "./modules/auth/routes/authRoutes";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <AppRoutes />
      <AuthRoutes />
    </>
  );
}

export default App;
