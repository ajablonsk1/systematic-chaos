export const getGraphElements = (graphNodes) => {
  const nodes = graphNodes.map((nodeInfo) => ({
    data: {
      id: nodeInfo.id,
      color: nodeInfo.color
    }
  }))

  const edges = graphNodes.map((nodeInfo) =>
    nodeInfo.targetIds.map((targetId) => ({
      data: {
        source: nodeInfo.id,
        target: targetId
      }
    }))
  )

  const merged = [].concat(...edges)

  return [...nodes, ...merged]
}
