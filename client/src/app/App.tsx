import * as React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Layout from "./Layout";
import RegPage from "../pages/RegPage";
import LoginPage from "../pages/LoginPage";
import TablePage from "../pages/TablePage";
import NotFound from "../pages/NotFound";
import axiosInstance, { SetAccessToken } from "../axiosInstance";

function App(): JSX.Element {

  const [user, setUser] = useState(null);

  // ===============================================================

  useEffect(() => {
    axiosInstance.get("/tokens/refresh").then(({ data }) => {
      setUser(data.user);
      SetAccessToken(data.accessToken);
    });
  },  []);

// ===============================================================

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} setUser={setUser}/>,
      errorElement: <NotFound />,
      children: [
       
        
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/table",
          element: <TablePage user={user}/>,
        },
        {
          path: "/login",
          element: <LoginPage setUser={setUser} />,
        },
        {
          path: "/reg",
          element: <RegPage setUser={setUser}/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;