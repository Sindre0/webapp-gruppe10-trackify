import React from "react";
import { LayoutProps } from "rwsdk/router";
import { navigate } from "rwsdk/client";

interface PrivateRouteProps extends LayoutProps {
    isLoggedIn: boolean;
}

export default function PrivateRoute({ children, isLoggedIn }: PrivateRouteProps) {
    if (!isLoggedIn) {
        navigate("/login");
    }
    return children;
}
