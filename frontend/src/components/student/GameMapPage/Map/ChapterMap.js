import React, { useState, useEffect, useCallback } from 'react'
import { Row } from 'react-bootstrap'
import Loader from '../../../general/Loader/Loader'
import { Map } from '../GameMapStyles'
import ActivityField from './ActivityField'

function getActivity(map, x, y) {
  return map.tasks.find((activity) => activity.posX === x && activity.posY === y) || null
}

function createMap(map) {
  const rowsObj = []
  for (let i = 0; i < map.mapSizeY; i++) {
    const cols = []
    for (let j = 0; j < map.mapSizeX; j++) {
      cols.push(getActivity(map, j, i))
    }
    rowsObj.push(cols)
  }
  return rowsObj
}

export default function ChapterMap({ map, marginNeeded, parentRef, mapClickable }) {
  const [size, setSize] = useState(undefined)

  const rows = createMap(map)

  const getParentSize = useCallback(() => {
    const emptySpaceX = 32 + rows[0].length * 2
    const emptySpaceY = 32 + rows.length * 2 + marginNeeded ? 32 : 0 // margin-x only

    if (parentRef?.current?.offsetWidth && parentRef.current?.offsetHeight) {
      return {
        x: parentRef?.current?.offsetWidth - emptySpaceX,
        y: parentRef.current?.offsetHeight - emptySpaceY
      }
    } else return { x: 0, y: 0 }
  }, [marginNeeded, parentRef, rows])

  useEffect(() => {
    function setHeight() {
      let { x, y } = getParentSize()
      const possibleSize = Math.floor(Math.min(x / map.mapSizeX, y / map.mapSizeY))
      setSize(possibleSize ?? 0)
    }

    setHeight() // first time, on component mount
    window.addEventListener('resize', setHeight) // always when window resize
  }, [parentRef, map.mapSizeX, map.mapSizeY, getParentSize])

  const MapRows = rows.map((row, idx1) => (
    <Row key={idx1} className='mx-auto'>
      {row.map((activity, idx2) => (
        <ActivityField
          key={idx2 + ' ' + idx1}
          activity={activity}
          posX={idx2}
          posY={idx1}
          colClickable={mapClickable}
          colSize={size}
        />
      ))}
    </Row>
  ))

  return (
    <>
      {!rows ? (
        <Loader />
      ) : (
        <Map fluid className={`${marginNeeded && 'my-2'} h-100`}>
          {MapRows}
        </Map>
      )}
    </>
  )
}
