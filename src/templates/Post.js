import React from "react"
import moment from "moment"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { Layout } from "../Layout"

import "./Post.css"

const Main = ({ data }) => {
  if (data == null || data.markdownRemark == null) {
    return <Layout />
  }

  const post = data.markdownRemark
  const { slug, date, title, author, summary } = post.frontmatter

  const formattedDate = moment.utc(date).format("DD MMMM YYYY")

  const metaTitle = `${title} - OpenSAGE blog`
  const metaDate = moment.utc(date).toISOString()

  return (
    <Layout title={`${title} - OpenSAGE`}>
      <Helmet>
        <meta name="twitter:title" content={metaTitle} />
        {summary ? <meta name="twitter:description" content={summary} /> : null}
        <meta
          name="twitter:image"
          content="https://opensage.github.io/main-menu-social.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:title" content={metaTitle} />
        {summary ? <meta property="og:description" content={summary} /> : null}
        <meta
          property="og:url"
          content={`https://opensage.github.io/blog/${slug}/`}
        />
        <meta
          property="og:image"
          content="https://opensage.github.io/main-menu-social.jpg"
        />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={metaDate} />
      </Helmet>
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

export default Main;

export const query = graphql`
  query BlogPostBySlug($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
        summary
        author
        date
      }
    }
  }
`
