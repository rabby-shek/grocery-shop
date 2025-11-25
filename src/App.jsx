import React from "react";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";
import LoadScripts from "./components/LoadScripts";
import { RouterProvider } from "react-router-dom";
import Route from "./routes/Route";

const App = () => {
  return (
    <>
    <RouterProvider router={Route} />
    </>
  );
};

export default App;
