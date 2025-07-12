import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GlobalUnlockProvider } from "@/contexts/global-unlock-context"
import { EnvironmentSidebar } from "@/components/sidebar/environment-sidebar"
import { CursorOrb } from "@/components/ui/cursor-orb"
import { ConversationalGeniusOrb } from "@/components/genius-guide-orb/conversational-genius-orb"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SnapAiFi - Unified Financial Intelligence Platform",
  description: "Advanced AI-powered financial services, business management, and digital asset trading platform",
  keywords: "AI, finance, trading, business, credit, real estate, digital assets",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <GlobalUnlockProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
              {/* Environment Sidebar */}
              <EnvironmentSidebar />

              {/* Main Content */}
              <div className="ml-16 min-h-screen">{children}</div>

              {/* Global UI Elements */}
              <CursorOrb />
              <ConversationalGeniusOrb />
            </div>
          </GlobalUnlockProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
