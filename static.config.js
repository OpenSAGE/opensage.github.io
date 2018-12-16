import { readFileSync, readdirSync } from "fs"
import * as path from "path"
import { orderBy } from "lodash"
import marked from "marked"
import chokidar from "chokidar"
import { reloadRoutes } from "react-static/node"

// Watch blog posts for changes
chokidar
  .watch("./posts/**/*.md", { ignoreInitial: true })
  .on("all", () => reloadRoutes())

const markdownRenderer = new marked.Renderer()

// Enable heading links
markdownRenderer.heading = (text, level) => {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, "-")

  return `
          <h${level}>
            <a name="${escapedText}" href="#${escapedText}">
            ${text}
            </a>
          </h${level}>`
}

// TODO: Implement thumbnails and link to full size
markdownRenderer.image = (href, _title, text) => {
  return `<img src="${href}" title="${text}"/>`
}

const postsRoot = path.join(__dirname, "posts")

function generatePost(id) {
  const postPath = path.join(postsRoot, id)
  const postConfig = require(path.join(postPath, "post.json"))
  const postMarkup = readFileSync(path.join(postPath, "index.md"), {
    encoding: "utf8"
  })

  const html = marked(postMarkup, { renderer: markdownRenderer })

  return {
    ...postConfig,
    id,
    html
  }
}

function getPosts() {
  const posts = readdirSync(postsRoot)
  return orderBy(posts.map(generatePost), ["publishedDate"], ["desc"])
}

export default {
  getRoutes: async () => {
    const posts = getPosts()

    return [
      {
        path: "/blog",
        getData: async () => ({ posts }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: "src/containers/Post",
          getData: async () => ({ post })
        }))
      }
    ]
  }
}
