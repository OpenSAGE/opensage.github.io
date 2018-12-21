import React from "react"
import { graphql } from "gatsby"

import { Layout } from "../Layout"
import { Row } from "../components/Layout"
import { Post } from "./blog"

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

const DevelopmentUpdates = ({ posts: { edges } }) =>
  edges.length === 0 ? null : (
    <section style={{ marginTop: "1em", marginBottom: "2em" }}>
      <strong>Latest development updates</strong>
      <ul>
        {edges.map(({ node: { frontmatter } }) => (
          <Post key={frontmatter.slug} post={frontmatter} />
        ))}
      </ul>
    </section>
  )

export default ({ data }) => (
  <Layout>
    <>
      <p>
        <b>OpenSAGE</b> is a free, open source re-implementation of SAGE, the 3D
        real-time strategy engine used in Command & Conquer™: Generals and other
        RTS titles from EA Pacific.
      </p>

      <DevelopmentUpdates posts={data.latestPosts} />

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
        The engine is under active development by a small group of volunteers.
        While the engine doesn't yet implement much of proper gameplay for any
        of the supported games, it can already load most types of assets from
        the first few SAGE titles, load into maps and display user interfaces.
      </p>

      <p>
        The engine is written in modern C# and runs on Windows, macOS and Linux
        using <a href="https://github.com/dotnet/core">.NET Core</a>. We use{" "}
        <a href="https://mellinoe.github.io/veldrid-docs/index.html">Veldrid</a>{" "}
        in order to support a variety of graphics APIs (including Direct3D 11,
        OpenGL and Metal) with a single codebase. The source code is available
        on <a href="https://github.com/OpenSAGE/OpenSAGE">GitHub</a> under the
        LGPLv3 license.
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
    latestPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___slug] }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            date
          }
        }
      }
    }
  }
`
