import "normalize.css"

import React from "react"
import { Root, Routes, Head } from "react-static"
import { Nav, RouteNavItem, LinkNavItem } from "./components/Nav"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

import "./App.css"

const App = () => (
  <Root className="page">
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Serif+TC|Source+Code+Pro"
        rel="stylesheet"
      />
    </Head>
    <Header>
      <Nav>
        <RouteNavItem name="About" to="/" />
        <RouteNavItem name="Blog" to="/blog" />
        <LinkNavItem name="GitHub" to="https://github.com/OpenSAGE/OpenSAGE" />
        <LinkNavItem name="Discord" to="https://discord.gg/G2FhZUT" />
      </Nav>
    </Header>
    <div id="main-content">
      <Routes />
    </div>
    <Footer />
  </Root>
)

export default App
