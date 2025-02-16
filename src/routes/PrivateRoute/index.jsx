import React from "react"
import {Navigate} from "react-router-dom"

import UserInfo from "../../pages/user-info"

const LoginPrivateRoute = () => {
    const data = localStorage.getItem("user")

    return <>{data ? <UserInfo /> : <Navigate to={"/login"} />}</>
}

export default LoginPrivateRoute
