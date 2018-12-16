import React from "react"
import { Link } from "@reach/router"

import "./Header.css"

export const Header = ({ children }) => (
  <header>
    <Link to="/">
      <div className="header__logo" />
    </Link>
    {children}
  </header>
)
