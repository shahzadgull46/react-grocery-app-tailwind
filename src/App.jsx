
import "./App.css";

import Header from "./components/Header";
import Body from "./components/Body";
import Product from "./components/Product";

import { Outlet } from "react-router-dom";

import { createBrowserRouter } from "react-router-dom";
import About from "./components/Routes/About.jsx";
import Contact from "./components/Routes/Contact.jsx";
import Error from "./components/Routes/Error.jsx";

const Applayout = () => {
  return (
    <div className="app">
      <Header />

      <Outlet />
    </div>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],

    errorElement: <Error />,
  },
]);

export default Applayout;

