import React from "react"
import { withRouteData } from "react-static"
import { Link } from "@reach/router"

export default withRouteData(
  ({ post }) =>
    console.log(post) || (
      <div>
        <Link to="/blog/">{"<"} Back</Link>
        <br />
        <h3>{post.title}</h3>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    )
)
