import { useState } from "react"
import {
  NavbarContainer,
  HamburguerMenu,
  HamburguerMenuIcon,
  NavbarLink,
  HamburguerMenuLink,
} from "./navbarCSS"
import "./transitions.css"

function Navbar() {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  return (
    <NavbarContainer className="visible">
      <div>
        <a href="/">
          <img src="/thesesockstho_logo.png" alt="TheseSocksTho Logo" />
        </a>
      </div>

      <div className={`normal-items`}>
        <NavbarLink to={"/"} className="tst-btn primary">
          Home
        </NavbarLink>
        <NavbarLink to={"/shop"} className="tst-btn">
          Shop
        </NavbarLink>
      </div>

      <HamburguerMenuIcon
        type="checkbox"
        role="button"
        aria-label="Display the menu"
        checked={isMenuVisible}
        onClick={toggleMenu}
      />
      <HamburguerMenu className={isMenuVisible ? "menuVisible" : "menuHidden"}>
        <HamburguerMenuLink to={"/"} onClick={() => toggleMenu()}>
          Home
        </HamburguerMenuLink>
        <HamburguerMenuLink to={"/shop"} onClick={() => toggleMenu()}>
          Shop
        </HamburguerMenuLink>
      </HamburguerMenu>
    </NavbarContainer>
  )
}

export default Navbar
