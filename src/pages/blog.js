import React from "react"
import { withRouteData } from "react-static"
import { Link } from "@reach/router"

export default withRouteData(
  props =>
    console.log(props) || (
      <div>
        <h1>It's blog time.</h1>
        <br />
        All Posts:
        <ul>
          {console.log(props.posts) ||
            props.posts.map(post => (
              <li key={post.id}>
                <Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
              </li>
            ))}
        </ul>
      </div>
    )
)
