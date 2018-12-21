import React from "react"
import moment from "moment"
import { groupBy, uniq, orderBy } from "lodash"
import { Link, graphql } from "gatsby"

import { Layout } from "../Layout"

export const Post = ({ post }) => (
  <li>
    <Link to={`/blog/${post.slug}/`}>
      {post.title} ({moment(post.date).format("YYYY-MM-DD")})
    </Link>
  </li>
)

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(x => x.node.frontmatter)
  const postsByYear = groupBy(posts, post => moment(post.date).year())
  const years = orderBy(uniq(Object.keys(postsByYear))).reverse()

  return (
    <Layout title="Blog - OpenSAGE">
      <h1>The OpenSAGE blog</h1>
      {years.map(year => (
        <React.Fragment key={year}>
          <h2 key={year}>{year}</h2>
          <ul>
            {postsByYear[year].map(post => (
              <Post key={post.slug} post={post} />
            ))}
          </ul>
        </React.Fragment>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query BlogPosts {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___slug] }
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
