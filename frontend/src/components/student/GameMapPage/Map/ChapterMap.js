import React from 'react'
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

export default function ChapterMap({ map }) {
  const rows = createMap(map)

  const MapRows = rows.map((row, idx1) => (
    <Row key={idx1} className='mx-auto'>
      {row.map((activity, idx2) => (
        <ActivityField
          key={idx2 + ' ' + idx1}
          activity={activity}
          posX={idx2}
          posY={idx1}
          mapSizeY={map.mapSizeY}
          mapSizeX={map.mapSizeX}
        />
      ))}
    </Row>
  ))

  return (
    <>
      {!rows ? (
        <Loader />
      ) : (
        <Map fluid className='h-100 my-5'>
          {MapRows}
        </Map>
      )}
    </>
  )
}
