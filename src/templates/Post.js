import React from "react"
import moment from "moment"
import { graphql } from "gatsby"
import { Layout } from "../Layout"

import "./Post.css"

export default ({ data }) => {
  if (data == null || data.markdownRemark == null) {
    return <Layout />
  }

  const post = data.markdownRemark
  const { date, title, author } = post.frontmatter

  const formattedDate = moment(date).format("DD MMMM YYYY")

  return (
    <Layout title={`${title} - OpenSAGE`}>
      <h1>{title}</h1>
      <div className="post-metadata">
        <span className="post-metadata__author">{author}</span>
        <span className="post-metadata__date">{formattedDate}</span>
      </div>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  )
}

export const query = graphql`
  query BlogPostBySlug($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        author
        date
      }
    }
  }
`
