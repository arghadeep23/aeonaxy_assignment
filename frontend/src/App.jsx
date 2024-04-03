import { useState } from 'react'
import CreateProfile from './components/CreateProfile';
import SignUp from './components/SignUp';
import Reason from './components/Reason';
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignUp />
    },
    {
      path: '/create-profile',
      element: <CreateProfile />
    },
    {
      path: '/reason',
      element: <Reason />
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
