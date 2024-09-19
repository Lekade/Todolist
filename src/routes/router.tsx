import {createBrowserRouter, Navigate} from "react-router-dom";
import {App} from "../App";
import {Login} from "../components/login/Login";
import {TodolistsList} from "../components/todolistsList/TodolistsList";
import {ErrorPage} from "../components/errorPage/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Navigate to="/404"/>,
        children: [
            {
                index: true,
                element: <Navigate to="/todolists"/>
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/todolists",
                element: <TodolistsList/>,
            },
        ],
    },
    {
        path: "/404",
        element: <ErrorPage/>
    },
]);