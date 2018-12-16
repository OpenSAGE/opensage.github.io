import React from "react"
import { withRouteData, Head } from "react-static"
import { Link } from "@reach/router"

export default withRouteData(props => (
  <>
    <Head>
      <title>Blog - OpenSAGE</title>
    </Head>
    <h1>The OpenSAGE blog</h1>
    All Posts:
    <ul>
      {props.posts.map(post => (
        <li key={post.id}>
          <Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  </>
))
