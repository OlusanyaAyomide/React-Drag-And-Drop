'use client'
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { AllContextProvider } from '@/store/store'
import { Toaster } from "@/components/ui/toaster"

export default function ClientWrapper({children}:{children:React.ReactNode}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AllContextProvider>
        {children}
        <Toaster/>
      </AllContextProvider>
   </ThemeProvider>

  )
}
