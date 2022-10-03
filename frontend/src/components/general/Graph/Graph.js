import React, { useEffect, useRef } from 'react'
import cytoscape from 'cytoscape'
import klay from 'cytoscape-klay'
import { cytoscapeStylesheet } from './cytoscapeStyle'
import { getLayoutConfig } from './layoutConfigs'
import { createLabelsAndNodes } from './graphHelper'

/* @props
 *   - elements: list of edges and nodes
 *   - height: graph height
 *   - layoutName: layout configuration json
 *   - onNodeClick: on node tap callback
 *   - movable: if the value is true or does not exist, the layout can be moved, otherwise moving function is blocked
 *   - labels: labels list for nodes (optional)
 *   - ungrabify: graph cannot be grabbed (drag&drop disabled)
 * */

function Graph(props) {
  const container = useRef()
  const graph = useRef()

  // add nodes and edges to the graph
  useEffect(() => {
    graph.current?.elements().remove()
    graph.current?.add(props.elements)
  }, [props.elements, props.labels])

  useEffect(() => {
    if (!container.current) {
      return
    }

    if (props.layoutName === 'klay') {
      cytoscape.use(klay)
    }

    if (!graph.current) {
      graph.current = cytoscape({
        elements: props.elements,
        maxZoom: 1,
        zoom: props.movable !== false ? 0.5 : 1,
        style: cytoscapeStylesheet,
        container: container.current
      })

      graph.current.on('tap', 'node', (e) => {
        props.onNodeClick(e.target.id())
      })

      if (props.movable === false) {
        graph.current.autoungrabify(true)
        graph.current.panningEnabled(false)
      }

      if (props.ungrabify) {
        graph.current.autoungrabify(true)
      }
    }
  }, [props])

  useEffect(() => {
    const layout = graph.current?.layout(getLayoutConfig(props.layoutName))

    layout.pon('layoutstop', () => {
      if (props.labels && graph.current) {
        createLabelsAndNodes(graph.current, props.labels)
      }
    })
    layout?.run()
  }, [props])

  // before unmount component
  useEffect(() => {
    return () => graph.current?.destroy()
  }, [])

  return <div style={{ height: props.height }} ref={container} />
}

export default Graph
