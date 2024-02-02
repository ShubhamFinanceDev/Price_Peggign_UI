"use client";


import { useSelector } from "react-redux";
import { useEffect } from "react";
import pageRoutes from "@/utils/pageRoutes";
import { redirect } from "next/navigation";

export default function withoutAuth(Component) {
    return function UnauthenticatedComponent(props) {
        const { user } = useSelector((state) => state.authSlice);

        useEffect(() => {
            if (typeof window !== "undefined" && user?.email) {
                redirect(pageRoutes.DASHBOARD_PAGE())
            }
        }, [user.email]);

        if (!user.email) {
            // User is not authenticated, render the original component
            return <Component {...props} />;
        }
        return null;
    };
}
