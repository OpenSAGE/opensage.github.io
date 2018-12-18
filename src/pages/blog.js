import React from "react"
import { withRouteData, Head } from "react-static"
import { Link } from "@reach/router"
import moment from "moment"

import { groupBy, uniq, orderBy } from "lodash"

const Post = ({ post }) => (
  <li key={post.id}>
    <Link to={`/blog/post/${post.id}/`}>
      {post.title} ({post.publishedDate})
    </Link>
  </li>
)

export default withRouteData(({ posts }) => {
  const postsByYear = groupBy(posts, post => moment(post.publishedDate).year())
  const years = orderBy(uniq(Object.keys(postsByYear))).reverse()
  return (
    <>
      <Head>
        <title>Blog - OpenSAGE</title>
      </Head>
      <h1>The OpenSAGE blog</h1>
      {years.map(year => (
        <React.Fragment key={year}>
          <h2 key={year}>{year}</h2>
          <ul>
            {postsByYear[year].map(post => (
              <Post key={post.id} post={post} />
            ))}
          </ul>
        </React.Fragment>
      ))}
    </>
  )
})
