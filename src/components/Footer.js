import React from "react"

import "./Footer.css"

const currentYear = new Date(Date.now()).getFullYear()

export const Footer = () => (
  <footer>
    <div className="footer__content">
      <p>
        OpenSAGE is not associated with Electronic Arts or any other company.
        All trademarks are property of their respective owners. Screenshots of
        copyrighted works are only used for demonstration purposes.
      </p>
      <p>© OpenSAGE {currentYear}</p>
    </div>
  </footer>
)
