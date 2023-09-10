import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const RequireAuth = ({ children }) => {
    const { user } = React.useContext(AuthContext);

    return user.isAdmin ? children : <Navigate to="/" />;
};
