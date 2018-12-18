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
        file="main-menu.jpg"
        description="Command & Conquer: Generals main menu, running in OpenSAGE."
      />
    </Row>

    <Row>
      <Screenshot
        file="viewer-2.png"
        description="OpenSAGE asset viewer showing a map from the China campaign of Generals with shadow maps enabled."
      />
      <Screenshot
        file="in-game-1.png"
        description="OpenSAGE in-game, running a skirmish match as a USA player."
      />
      <Screenshot
        file="viewer-3.png"
        description="OpenSAGE asset viewer displaying the credits window from Zero Hour."
      />
    </Row>
  </>
))
