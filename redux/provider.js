"use client";

import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import store from '@/redux/store'
import { useEffect } from "react";
import useConfigHooks from "@/hooks/useConfigHooks";


export function Providers({ children }) {
    const { restoreCookies } = useConfigHooks(store)
    useEffect(() => {
        restoreCookies()
    }, [])
    return (
        <SnackbarProvider>
            <Provider store={store}>{children}</Provider>
        </SnackbarProvider>
    )

}