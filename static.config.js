import { readFileSync, readdirSync } from "fs"
import * as path from "path"
import { orderBy } from "lodash"
import marked from "marked"

const postsRoot = path.join(__dirname, "posts")

function parsePost(id) {
  let postPath = path.join(postsRoot, id)
  let postConfig = require(path.join(postPath, "post.json"))
  let postMarkup = readFileSync(path.join(postPath, "index.md"), {
    encoding: "utf8"
  })

  return { ...postConfig, id, html: marked(postMarkup) }
}

function getPosts() {
  let posts = readdirSync(postsRoot)
  return orderBy(posts.map(parsePost), ["publishedDate"], ["desc"])
}

export default {
  getSiteData: async () => ({ title: "OpenSAGE" }),
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
