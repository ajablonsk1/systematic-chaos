import { gameNodeChildStyle, gameNodeStyle, nodeLabelChildStyle, nodeLabelStyle } from './cytoscapeStyle'

export const getGraphElements = (graphElements) => {
  const nodes = graphElements.map((nodeInfo) => ({
    data: {
      id: nodeInfo.id ?? 0,
      position: nodeInfo.position,
      borderColor: nodeInfo.borderColor ?? 'black',
      size: nodeInfo.size ? nodeInfo.size + 'px' : '20px',
      padding: nodeInfo.size ? nodeInfo.size * 1.5 + 'px' : '30px',
      fontSize: nodeInfo.size ? nodeInfo.size * 3.2 + 'px' : '64px'
    },
    classes: nodeInfo.nodeClass ?? ''
  }))

  const edges = graphElements.map((nodeInfo) =>
    nodeInfo.targetIds
      ? nodeInfo.targetIds.map((targetId) => ({
          data: {
            source: nodeInfo.id ?? 0,
            target: targetId
          },
          classes: nodeInfo.edgeClass ?? ''
        }))
      : []
  )

  const merged = [].concat(...edges)

  return [...nodes, ...merged]
}

export const createLabelsAndNodes = (cy, labels) => {
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
    let nodeHtml = document.querySelector(`#nodeHtml-${node.id()}`)

    if (!labelHtml) {
      const labelChild = document.createElement('div')
      Object.assign(labelChild.style, nodeLabelChildStyle(node))

      labelHtml = document.createElement('div')
      labelHtml.id = 'labelHtml-' + node.id()

      labelHtml.appendChild(labelChild)
    }

    labelHtml.children[0].innerHTML = labels.find((label) => label.id === +node.data().id).label

    if (!nodeHtml) {
      const nodeChild = document.createElement('div')
      nodeChild.innerHTML = node.data().id
      Object.assign(nodeChild.style, gameNodeChildStyle(node))

      nodeHtml = document.createElement('div')
      nodeHtml.id = 'nodeHtml-' + node.id()

      nodeHtml.appendChild(nodeChild)
    }

    Object.assign(labelHtml.style, nodeLabelStyle(node))
    Object.assign(nodeHtml.style, gameNodeStyle(node))

    if (!nodesDomContainer.querySelector(`#labelHtml-${node.id()}`)) {
      nodesDomContainer.appendChild(labelHtml)
    }

    if (!nodesDomContainer.querySelector(`#nodeHtml-${node.id()}`)) {
      nodesDomContainer.appendChild(nodeHtml)
    }
  })
}
