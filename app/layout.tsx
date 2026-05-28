import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import MainSidebar from "@/components/nav/sidebar/mainSidebar"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <SidebarProvider>
            <MainSidebar />
            <div className="size-full">
              <header className="sticky top-2 z-40 flex items-center justify-between border-b bg-white p-4 md:hidden">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <span className="text-xl font-bold">AutoGest</span>
                </div>
              </header>

              <main className="w-full bg-gray-100 px-4 py-8 md:px-12">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
