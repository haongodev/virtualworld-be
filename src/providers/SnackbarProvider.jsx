"use client"
import { SnackbarProvider as NotistackProvider } from "notistack";
import React from "react";


const SnackbarProvider = ({ children }) => {
    return (
        <NotistackProvider
            maxSnack={4}
            autoHideDuration={2000}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
        >
            {children}
        </NotistackProvider>
    );
};

export default SnackbarProvider;
