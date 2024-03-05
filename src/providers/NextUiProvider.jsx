'use client'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider } from 'next-themes'
import React from 'react'

export default function NextUiProvider({ children }) {
  return (
    <NextUIProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  )
}