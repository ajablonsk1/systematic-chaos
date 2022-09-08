export const getGraphElements = (graphElements) => {
  const nodes = graphElements.map((nodeInfo) => ({
    data: {
      id: nodeInfo.id,
      color: nodeInfo.color,
      backgroundColor: nodeInfo.backgroundColor ?? 'white',
      content: nodeInfo.content ?? nodeInfo.id,
      position: nodeInfo.position
    }
  }))

  const edges = graphElements.map((nodeInfo) =>
    nodeInfo.targetIds.map((targetId) => ({
      data: {
        source: nodeInfo.id,
        target: targetId
      },
      classes: nodeInfo.customClass ?? ''
    }))
  )

  const merged = [].concat(...edges)

  return [...nodes, ...merged]
}
