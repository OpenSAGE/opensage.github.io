import React from "react"
import { withRouteData, Head } from "react-static"
import moment from "moment"

import "./Post.css"

export default withRouteData(({ post }) => (
  <>
    <Head>
      <title>{post.title} - OpenSAGE</title>
    </Head>
    <h1>{post.title}</h1>
    <span>{moment(post.publishedDate).format("DD MMMM YYYY")}</span>
    <div
      className="post-content"
      dangerouslySetInnerHTML={{ __html: post.html }}
    />
  </>
))
