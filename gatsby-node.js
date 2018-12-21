const BlogPost = require.resolve("./src/templates/Post.js")

exports.createPages = async ({ actions, graphql }) => {
  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { slug } = node.frontmatter

      actions.createPage({
        path: `/blog/${slug}`,
        component: BlogPost,
        context: { slug }
      })
    })
  })
}
