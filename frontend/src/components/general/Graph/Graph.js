import React, { useEffect, useRef } from 'react'
import cytoscape from 'cytoscape'
import klay from 'cytoscape-klay'
import { cytoscapeStylesheet } from './cytoscapeStyle'
import { layoutConfig } from './layoutConfig'

/* @props
 *   - elements: list of edges and nodes
 *   - height: graph height
 * */

cytoscape.use(klay)

function Graph(props) {
  const container = useRef()
  const graph = useRef()

  // add nodes and edges to the graph
  useEffect(() => {
    graph.current?.elements().remove()
    graph.current?.add(props.elements)
  }, [props.elements])

  useEffect(() => {
    if (!container.current) {
      return
    }

    if (!graph.current) {
      graph.current = cytoscape({
        elements: props.elements,
        maxZoom: 1,
        zoom: 0.5,
        style: cytoscapeStylesheet,
        container: container.current
      })
    }
  }, [props])

  useEffect(() => {
    const layout = graph.current?.layout(layoutConfig)
    layout?.run()
  }, [props])

  // before unmount component
  useEffect(() => {
    if (graph.current) {
      return () => graph.current?.destroy()
    }
  }, [])

  return <div style={{ height: props.height }} ref={container} />
}

export default Graph
