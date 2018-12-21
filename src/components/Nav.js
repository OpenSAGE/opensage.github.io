import React from "react"
import { Link } from "gatsby"

import "./Nav.css"

export const Nav = ({ children }) => (
  <nav className="navbar">
    <ol className="navbar__items">{children}</ol>
  </nav>
)

export const LinkNavItem = ({ name, to }) => (
  <li className="nav-item">
    <a href={to}>{name}</a>
  </li>
)

export const RouteNavItem = ({ name, to }) => (
  <li className="nav-item">
    <Link to={to}>{name}</Link>
  </li>
)
