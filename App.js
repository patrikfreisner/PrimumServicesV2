import React from "react";
import { LoginProvider } from "./src/context/LoginContext";
import MainRoutes from "./src/router/main-router";

export default function App() {
  return (
    <>
      <LoginProvider>
        <MainRoutes />
      </LoginProvider>
    </>
  );
}
