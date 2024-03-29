import React, { useState, useEffect, useCallback } from 'react'
import { Row } from 'react-bootstrap'
import Loader from '../../../general/Loader/Loader'
import { Map } from '../GameMapStyles'
import ActivityField from './ActivityField'
import ActivityService from '../../../../services/activity.service'
import { ERROR_OCCURRED } from '../../../../utils/constants'

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

export default function ChapterMap({ chapterId, marginNeeded, parentSize, mapClickable, reload }) {
  const [size, setSize] = useState(undefined)
  const [chapterMap, setChapterMap] = useState(undefined)
  const [rows, setRows] = useState(undefined)

  useEffect(() => {
    getActivityMap()

    // eslint-disable-next-line
  }, [chapterId])

  useEffect(() => {
    if (reload) {
      getActivityMap()
    }
    // eslint-disable-next-line
  }, [reload])

  useEffect(() => {
    if (chapterMap) {
      setRows(createMap(chapterMap))
    }
  }, [chapterMap])

  const getActivityMap = useCallback(() => {
    ActivityService.getActivityMap(chapterId)
      .then((response) => {
        setChapterMap(response)
      })
      .catch(() => {
        setChapterMap(null)
      })
  }, [chapterId])

  const getParentSize = useCallback(() => {
    if (!rows) {
      return { x: 0, y: 0 }
    }

    const emptySpaceX = 32 + rows[0].length * 2
    const emptySpaceY = 32 + rows.length * 2 + marginNeeded ? 32 : 0 // margin-x only

    if (parentSize.x && parentSize.y) {
      return {
        x: parentSize.x - emptySpaceX,
        y: parentSize.y - emptySpaceY
      }
    } else {
      return { x: 0, y: 0 }
    }
  }, [marginNeeded, parentSize, rows])

  useEffect(() => {
    if (!chapterMap) {
      setSize(0)
    } else {
      let { x, y } = getParentSize()
      const possibleSize = Math.floor(Math.min(x / chapterMap.mapSizeX, y / chapterMap.mapSizeY))
      setSize(possibleSize ?? 0)
    }
  }, [chapterMap, getParentSize])

  const isCompletedActivityAround = (posX, posY) => {
    for (let i = posX - 1; i <= posX + 1; i++) {
      for (let j = posY - 1; j <= posY + 1; j++) {
        const adjacentActivity = chapterMap?.tasks.find((task) => task.posX === i && task.posY === j)

        if (adjacentActivity && adjacentActivity.isCompleted) {
          return true
        }
      }
    }
    return false
  }

  const allActivitiesCompleted = () => {
    if (!chapterMap || !chapterMap?.tasks.length) return false

    const uncompletedActivity = chapterMap.tasks.find((task) => !task.isCompleted)

    return !uncompletedActivity
  }

  return (
    <>
      {rows === undefined ? (
        <Loader />
      ) : rows == null ? (
        <p>{ERROR_OCCURRED}</p>
      ) : (
        <Map
          fluid
          className={`${marginNeeded && 'my-2'} h-100`}
          $width={size * rows[0].length + 'px'}
          $height={size * rows.length + 'px'}
          $background={'data:image/png;base64, ' + chapterMap?.image?.file}
        >
          {rows.map((row, idx1) => (
            <Row key={idx1} className='mx-auto'>
              {row.map((activity, idx2) => (
                <ActivityField
                  key={idx2 + ' ' + idx1}
                  activity={activity}
                  posX={idx2}
                  posY={idx1}
                  colClickable={mapClickable}
                  colSize={size}
                  isCompletedActivityAround={isCompletedActivityAround(idx2, idx1)}
                  allActivitiesCompleted={allActivitiesCompleted()}
                />
              ))}
            </Row>
          ))}
        </Map>
      )}
    </>
  )
}
