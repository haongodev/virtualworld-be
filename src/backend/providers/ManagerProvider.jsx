'use client'
import { getAdminAuth } from "@/src/server/api/auth/getAdminAuth";
import React, { useReducer,createContext,useMemo,useContext, useEffect } from "react";
import PreLoadScreen from "../components/PreLoadScreen";

export const ManagerContext = createContext({
    user: {},
    setUser: (params) => {},
});

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {...state, ...action.payload.admin}
        case "DELETE_USER":
            return {}
        default: {
            return state;
      }
    }
};

export const useCurrentManagerContext = () => useContext(ManagerContext);

export default function ManagerProvider({ children }) {
    const [user, setUser] = useReducer(reducer,{});
    const contextValue = useMemo(
        () => ({
            user,
            setUser,
        }),
        [user, setUser]
    );
    useEffect(() => {
        getAdminAuth().then((data) => {
            if(Object.keys(data).length > 0 && !data.hasOwnProperty('error')){
                // @ts-ignore
                setUser({
                    type: "SET_USER",
                    payload: data,
                });
            }
        })
    }, []);
    if(Object.keys(user).length === 0){
        return <PreLoadScreen/>
    }
    return (
        <ManagerContext.Provider value={contextValue}>
            {children}
        </ManagerContext.Provider>
    )
}