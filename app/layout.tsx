import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Unextep - Launch your SaaS in under 60 minutes",
  description:
    "The complete toolkit for indie hackers and solo developers. Built-in auth, payments, and deployment — everything you need to launch fast.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen font-sans antialiased", spaceGrotesk.variable, inter.variable)}>
        {children}
      </body>
    </html>
  )
}
