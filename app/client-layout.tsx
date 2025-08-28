"use client"

import { MobileNav } from "@/components/mobile-nav"
import React from "react"

function ConditionalMobileNav() {
  const [showNav, setShowNav] = React.useState(true)

  React.useEffect(() => {
    const checkPath = () => {
      const path = window.location.pathname
      // Ocultar navegación en páginas de carga
      setShowNav(path !== "/welcome" && path !== "/loading")
    }

    checkPath()

    // Escuchar cambios de ruta
    const handlePopState = () => checkPath()
    window.addEventListener("popstate", handlePopState)

    // Observer para cambios de URL sin popstate
    const observer = new MutationObserver(() => {
      setTimeout(checkPath, 100)
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("popstate", handlePopState)
      observer.disconnect()
    }
  }, [])

  return showNav ? <MobileNav /> : null
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <ConditionalMobileNav />
    </>
  )
}
