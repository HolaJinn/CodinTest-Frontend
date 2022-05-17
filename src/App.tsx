import React from "react";
import "./App.css";
import "../src/assets/styles/app.styles.scss";
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
