import "normalize.css"
import "./App.css"

import React from "react"

import { Helmet } from "react-helmet"

import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Nav, LinkNavItem, RouteNavItem } from "./components/Nav"

export const Layout = ({ children, title }) => (
  <div className="page">
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title || "OpenSAGE"}</title>
    </Helmet>
    <Header>
      <Nav>
        <RouteNavItem name="About" to="/" />
        <RouteNavItem name="Blog" to="/blog" />
        <LinkNavItem name="GitHub" to="https://github.com/OpenSAGE/OpenSAGE" />
        <LinkNavItem name="Discord" to="https://discord.gg/G2FhZUT" />
      </Nav>
    </Header>
    <div id="main-content">{children}</div>
    <Footer />
  </div>
)
