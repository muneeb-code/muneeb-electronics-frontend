import React from "react";
import AppRoutes from "./app-routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
