export const getNodePosition = (chapterPosition, mapContainerSize) => {
  if (!mapContainerSize) {
    return { x: 0, y: 0 }
  }

  const scaleX = 10
  const scaleY = 8
  const padding = 10 //px
  const mapContainerSizeWithPadding = { x: mapContainerSize.x - 2 * padding, y: mapContainerSize.y - 2 * padding }

  const x = (mapContainerSizeWithPadding.x / scaleX) * (chapterPosition.x - 0.5)
  const y = (mapContainerSizeWithPadding.y / scaleY) * (chapterPosition.y - 0.5)

  return { x, y }
}
