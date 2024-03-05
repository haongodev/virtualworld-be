'use client'
import { NextIntlClientProvider } from 'next-intl';
import React, { useReducer,createContext,useMemo,useContext } from "react";

export const CurrentLocaleContext = createContext({
    currentLocale: "",
    setCurrentLocale: () => {},
});
  
const reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_CURRENT_LOCALE":
        
      default: {
        return state;
      }
    }
};

export const useCurrentLocaleContext = () => useContext(CurrentLocaleContext);

export default function NextIntlProvider({ locale, messages, children }) {
    const [currentLocale, setCurrentLocale] = useReducer(reducer, locale);
    const contextValue = useMemo(
        () => ({
            currentLocale,
            setCurrentLocale,
        }),
        [currentLocale, setCurrentLocale]
    );
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <CurrentLocaleContext.Provider value={contextValue}>
                {children}
            </CurrentLocaleContext.Provider>
        </NextIntlClientProvider>
    )
}