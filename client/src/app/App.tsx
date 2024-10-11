import * as React from "react";
import { useState, useEffect } from "react";
import "./App.css";
// import { createRoot } from "react-dom/client";
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
import axiosInstance, { setAccessToken } from "../shared/api/axiosInstance";
import { UserRegType } from "../pages/UserRegType";

function App(): JSX.Element {

 

  type Refresh = {
    user: UserRegType;
    accessToken: string;
  }

  const [user, setUser] = useState<UserRegType | null>(null);

  // ===============================================================

  useEffect(() => {
    axiosInstance.get<Refresh>("/tokens/refresh").then(({ data }) => {
      setUser(data.user);
      setAccessToken(data.accessToken);
    });
  },  []);

// ===============================================================

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} setUser={setUser}/>,
      errorElement: <NotFound />,
      children: [
       
        
        // {
        //   path: "/",
        //   element: <HomePage />,
        // },
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