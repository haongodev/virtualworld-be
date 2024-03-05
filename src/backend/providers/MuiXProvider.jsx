'use client'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import React from 'react'

export default function MuiXProvider({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        {children}
    </LocalizationProvider>
  )
}