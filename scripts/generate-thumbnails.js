const path = require("path")
const glob = require("glob")
const fs = require("fs")
const Jimp = require("jimp")

// Resize images larger than this (in bytes)
const resizeThreshold = 1024 * 500
// Thumbnails must fit within a rectangle sized width*height
const maxThumbnailSize = [1000, 562]

const assetsRoot = path.resolve(__dirname, "../", "public", "assets")

const files = glob.sync("{posts,screenshots}/**/!(*-thumb).{jpg,png}", {
  cwd: assetsRoot
})

const tasks = []

for (const relativePath of files) {
  const fullPath = path.resolve(assetsRoot, relativePath)
  const stat = fs.statSync(fullPath)

  if (stat.size <= resizeThreshold) {
    console.log(
      `Skipping ${relativePath} (size ${Math.ceil(stat.size / 1024)} kb)`
    )
    continue
  }

  tasks.push(Jimp.read(fullPath))

  const task = Jimp.read(fullPath).then(image => {
    const pathParts = path.parse(fullPath)

    const thumbPath = path.format({
      dir: pathParts.dir,
      name: pathParts.name + "-thumb",
      ext: ".jpg"
    })

    console.log(`Processing ${relativePath}...`)

    return image
      .scaleToFit(maxThumbnailSize[0], maxThumbnailSize[1])
      .quality(95)
      .writeAsync(thumbPath)
  })
  tasks.push(task)
}

Promise.all(tasks).then(() => {
  console.log("Done!")
})
