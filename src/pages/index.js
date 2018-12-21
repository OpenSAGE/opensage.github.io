import React from "react"
import { graphql } from "gatsby"

import { Layout } from "../Layout"
import { Row } from "../components/Layout"

const Screenshot = ({
  img: {
    image: { source, thumbnails }
  },
  description
}) => (
  <a
    className="responsive-image-container"
    href={source.src}
    title={description}
  >
    <img
      className="responsive-image"
      srcSet={thumbnails.srcSet}
      src={thumbnails.src}
      sizes={thumbnails.sizes}
      alt={description}
    />
  </a>
)

export default ({ data }) => (
  <Layout title="OpenSAGE">
    <>
      <p>
        <b>OpenSAGE</b> is a free, open source re-implementation of SAGE, the 3D
        real time strategy (RTS) engine used in Command & Conquer™: Generals and
        other RTS titles from EA Pacific.
      </p>

      <Row>
        <Screenshot
          img={data.mainMenu}
          description="Command & Conquer: Generals main menu, running in OpenSAGE."
        />
      </Row>

      <Row>
        <Screenshot
          img={data.viewer2}
          description="OpenSAGE asset viewer showing a map from the China campaign of Generals with shadow maps enabled."
        />
        <Screenshot
          img={data.ingame1}
          description="OpenSAGE in-game, running a skirmish match as a USA player."
        />
        <Screenshot
          img={data.viewer3}
          description="OpenSAGE asset viewer displaying the credits window from Zero Hour."
        />
      </Row>

      <p>
        The engine is written in modern C#, and runs on Windows, macOS and Linux
        using .NET Core. And a little bit more text like this.
      </p>
    </>
  </Layout>
)

export const screenshotImage = graphql`
  fragment screenshotImage on File {
    image: childImageSharp {
      source: fixed(width: 1000, quality: 95) {
        src
      }
      thumbnails: fluid(maxWidth: 650, quality: 85, toFormat: JPG) {
        src
        srcSet
        sizes
      }
    }
  }
`

export const query = graphql`
  query {
    mainMenu: file(relativePath: { eq: "main-menu.jpg" }) {
      ...screenshotImage
    }
    viewer2: file(relativePath: { eq: "viewer-2.png" }) {
      ...screenshotImage
    }
    ingame1: file(relativePath: { eq: "in-game-1.png" }) {
      ...screenshotImage
    }
    viewer3: file(relativePath: { eq: "viewer-3.png" }) {
      ...screenshotImage
    }
  }
`
