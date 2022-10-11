import React, { useRef, useEffect, useState, useCallback } from 'react'
import Graph from '../../general/Graph/Graph'
import { getNodePosition } from './gameMapHelper'
import { GameMapContainer as GameMapContainerStyle } from './GameMapStyles'
import { connect } from 'react-redux'
import { isMobileView } from '../../../utils/mobileHelper'

function GameMapContainer(props) {
  const [mapContainerSize, setMapContainerSize] = useState(null)
  const containerRef = useRef()

  useEffect(() => {
    if (containerRef.current && !props.customHeight) {
      setMapContainerSize({
        x: containerRef.current.offsetWidth,
        y: containerRef.current.offsetHeight
      })
    } else if (props.customHeight) {
      setMapContainerSize({
        x: props.customHeight * 1.5,
        y: props.customHeight
      })
    }
  }, [containerRef.current?.offsetWidth, props])

  const getHeight = useCallback(() => {
    if (props.customHeight) {
      return props.customHeight
    }
    return mapContainerSize ? mapContainerSize.y - 20 : 0
  }, [mapContainerSize, props])

  return (
    <div style={{ maxWidth: '100vw', overflowX: 'auto' }}>
      <GameMapContainerStyle
        $borderColor={props.theme.primary}
        className={'mx-auto rounded mt-3'}
        ref={containerRef}
        $customHeight={props.customHeight}
      >
        <Graph
          elements={props.elements?.map((element) => ({
            classes: element.classes,
            data: { ...element.data, position: getNodePosition(element.data.position, mapContainerSize) }
          }))}
          layoutName={'preset'}
          height={getHeight()}
          onNodeClick={props.nodeClickCallback}
          movable={false}
          labels={props.labels}
        />
      </GameMapContainerStyle>
    </div>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(GameMapContainer)
