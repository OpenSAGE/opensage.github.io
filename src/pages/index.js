import React from "react"
import { withSiteData, Head } from "react-static"
import { Row } from "../components/Layout"
import { toThumbnailUrl } from "../util"

const Screenshot = ({ file, description }) => (
  <a
    className="responsive-image-container"
    href={`/assets/screenshots/${file}`}
    title={description}
  >
    <img
      className="responsive-image"
      src={toThumbnailUrl(`/assets/screenshots/${file}`)}
      alt={description}
    />
  </a>
)

export default withSiteData(() => (
  <>
    <Head>
      <title>OpenSAGE</title>
    </Head>
    <p>
      <b>OpenSAGE</b> is a free, open source re-implementation of SAGE, the 3D
      real time strategy (RTS) engine used in Command & Conquer™: Generals and
      other RTS titles from EA Pacific.
    </p>
    <p>
      The engine is written in modern C#, and runs on Windows, macOS and Linux
      using .NET Core. And a little bit more text like this.
    </p>

    <Row>
      <Screenshot
        file="screenshot-1.jpg"
        description="A picture of the Command & Conquer: Generals main menu, running in OpenSAGE."
      />
    </Row>

    <Row>
      <Screenshot
        file="screenshot-1.jpg"
        description="An another picture of the main menu."
      />
      <Screenshot
        file="screenshot-1.jpg"
        description="The last picture of the main menu."
      />
    </Row>
  </>
))
