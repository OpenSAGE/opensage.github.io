export function toThumbnailUrl(url) {
  const pathParts = url.split("/")
  const fileName = pathParts[pathParts.length - 1]

  const thumbName = fileName.replace(/(\.png)|(.jpg)/, "-thumb.jpg")
  const thumbPath = [
    ...pathParts.slice(0, pathParts.length - 1),
    thumbName
  ].join("/")

  return thumbPath
}
