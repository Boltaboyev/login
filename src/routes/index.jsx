import {createBrowserRouter} from "react-router-dom"

import Login from "../pages/login"
import Register from "../pages/register"
import LoginPrivateRoute from "./PrivateRoute"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPrivateRoute />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
])
