import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Protected = ({ children }) => {
    const { user } = UserAuth();

    // null users are sent to home
    if (!user) {
        return (<Navigate to='/' />)
    }
    
    // else return children like normal
    return (children)
};

export default Protected;