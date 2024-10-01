import { createBrowserRouter, Navigate } from "react-router-dom"
import { App } from "app/App"
import { Login } from "features/auth/ui/Login"
import { TodolistsList } from "features/todolistsList/ui/TodolistsList"
import { ErrorPage } from "common/components/error404/ErrorPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/404" />,
    children: [
      {
        index: true,
        element: <Navigate to="/todolists" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/todolists",
        element: <TodolistsList />,
      },
    ],
  },
  {
    path: "/404",
    element: <ErrorPage />,
  },
])
