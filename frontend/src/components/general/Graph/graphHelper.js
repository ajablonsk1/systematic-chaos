import { nodeLabelStyle } from './cytoscapeStyle'

export const getGraphElements = (graphElements) => {
  const nodes = graphElements.map((nodeInfo) => ({
    data: {
      id: nodeInfo.id,
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

export const createLabels = (cy, labels) => {
  const cyContainer = cy.container()
  let nodesDomContainer = cyContainer.querySelector('#nodesContainer')

  if (!nodesDomContainer) {
    const cyCanvas = cyContainer.querySelector('canvas')

    nodesDomContainer = document.createElement('div')
    nodesDomContainer.id = 'nodesContainer'
    nodesDomContainer.style.position = 'absolute'

    cyCanvas?.parentNode?.appendChild(nodesDomContainer)
  }

  cy.nodes().forEach((node) => {
    let labelHtml = document.querySelector(`#labelHtml-${node.id()}`)

    if (!labelHtml) {
      labelHtml = document.createElement('div')
      labelHtml.id = 'labelHtml-' + node.id()
    }

    labelHtml.innerHTML = labels.find((label) => label.id === +node.data().id).label
    Object.assign(labelHtml.style, nodeLabelStyle(node))

    if (!nodesDomContainer.querySelector(`#labelHtml-${node.id()}`)) {
      nodesDomContainer.appendChild(labelHtml)
    }
  })
}
