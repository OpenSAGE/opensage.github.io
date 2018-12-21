module.exports = {
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              icon: false
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 600
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/posts`,
        name: "blog-posts"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/images/screenshots`,
        name: "screenshots"
      }
    }
  ]
}
