import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import Navbar from "./components/navbar/navbar"
import { Outlet } from "react-router-dom"
import Footer from "./components/footer/footer"

function App() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  )
}

export default App

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
