export const getGraphElements = (graphElements) => {
  const nodes = graphElements.map((nodeInfo) => ({
    data: {
      id: nodeInfo.id,
      content: nodeInfo.id,
      position: nodeInfo.position
    },
    classes: nodeInfo.nodeClass ?? ''
  }))

  const edges = graphElements.map((nodeInfo) =>
    nodeInfo.targetIds.map((targetId) => ({
      data: {
        source: nodeInfo.id,
        target: targetId
      },
      classes: nodeInfo.edgeClass ?? ''
    }))
  )

  const merged = [].concat(...edges)

  return [...nodes, ...merged]
}
