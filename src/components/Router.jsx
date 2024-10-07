import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from './Home';
import Profile from './Profile';
import Signup from './Signup';
import Login from './Login';
import Like1 from './Like1';


  const router = createBrowserRouter([
    
    {
      path: "/",
      element: <Signup/>,
    },
    {
        path: "/Login",
        element: <Login/>,
      },
    {
        path: "/Home",
        element: <Home/>,
      },
      {
        path: "/Like",
        element: <Like1/>,
      },
    {
        path: "/Profile",
        element: <Profile/>,
      },
  ]);


export default router