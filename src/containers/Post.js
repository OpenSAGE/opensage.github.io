import React from "react"
import { withRouteData, Head } from "react-static"
import { Link } from "@reach/router"

export default withRouteData(({ post }) => (
  <>
    <Head>
      <title>{post.title} - OpenSAGE</title>
    </Head>
    <Link to="/blog/">{"<"} Back</Link>
    <br />
    <h3>{post.title}</h3>
    <div
      className="post-content"
      dangerouslySetInnerHTML={{ __html: post.html }}
    />
  </>
))
