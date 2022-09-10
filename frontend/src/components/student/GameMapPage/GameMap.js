import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { GameMapContainer } from './GameMapStyles'
import Graph from '../../general/Graph/Graph'
import ChapterService from '../../../services/chapter.service'
import Loader from '../../general/Loader/Loader'
import { ERROR_OCCURRED } from '../../../utils/constants'
import { getGraphElements, getGraphElementsWithLabels } from '../../general/Graph/graphHelper'
import ChapterMapModal from './ChapterMapModal'
import { getNodePosition } from './gameMapHelper'

function GameMap() {
  const [chaptersList, setChaptersList] = useState(undefined)
  const [graphElements, setGraphElements] = useState(null)
  const [isChapterMapOpen, setIsChapterMapOpen] = useState(false)
  const [chosenChapterId, setChosenChapterId] = useState(null)
  const [mapContainerSize, setMapContainerSize] = useState(null)
  const containerRef = useRef()

  useEffect(() => {
    if (containerRef.current) {
      setMapContainerSize({
        x: containerRef.current.offsetWidth,
        y: containerRef.current.offsetHeight
      })
    }
  }, [containerRef.current?.offsetWidth])

  useEffect(() => {
    ChapterService.getChaptersList()
      .then((response) => {
        // TODO: replace with "response" when it will be included chapterPosition
        const responseWithPosition = [...response].map((chapter) => ({
          ...chapter,
          chapterPosition: { x: Math.floor(Math.random() * 10 + 1), y: Math.floor(Math.random() * 8 + 1) }
        }))
        setChaptersList(responseWithPosition)
      })
      .catch(() => {
        setChaptersList(null)
      })
  }, [])

  useEffect(() => {
    if (chaptersList) {
      const graphInfo = chaptersList.map((chapter, index) => ({
        id: chapter.id,
        targetIds: index === chaptersList.length - 1 ? [] : [chaptersList[index + 1].id],
        position: getNodePosition(chapter.chapterPosition, mapContainerSize),
        edgeClass: 'gameMapEdge',
        nodeClass: 'gameMapNode'
      }))

      setGraphElements(getGraphElements(graphInfo))
    }
  }, [chaptersList, mapContainerSize])

  useEffect(() => {
    if (chosenChapterId) {
      setIsChapterMapOpen(true)
    }
  }, [chosenChapterId])

  const getNodesLabels = useCallback(() => {
    if (chaptersList) {
      return chaptersList.map((chapter) => ({
        id: chapter.id,
        label: chapter.name
      }))
    }
    return null
  }, [chaptersList])

  return (
    <>
      <Content className={'vh-100'}>
        {chaptersList === undefined ? (
          <Loader />
        ) : chaptersList == null ? (
          <p>{ERROR_OCCURRED}</p>
        ) : (
          <>
            <h2 className={'text-center pt-4'}>Mapa gry</h2>
            <GameMapContainer className={'mx-auto rounded mt-5'} ref={containerRef}>
              <Graph
                elements={graphElements}
                layoutName={'preset'}
                height={mapContainerSize ? mapContainerSize.y - 20 : 0}
                onNodeClick={(nodeId) => {
                  setChosenChapterId({ id: nodeId })
                }}
                movable={false}
                labels={getNodesLabels()}
              />
            </GameMapContainer>
          </>
        )}
      </Content>
      <ChapterMapModal show={isChapterMapOpen} setModalOpen={setIsChapterMapOpen} chapterId={chosenChapterId?.id} />
    </>
  )
}

export default GameMap
