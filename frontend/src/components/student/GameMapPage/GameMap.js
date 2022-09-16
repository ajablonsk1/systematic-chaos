import React, { useCallback, useEffect, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import ChapterService from '../../../services/chapter.service'
import Loader from '../../general/Loader/Loader'
import { ERROR_OCCURRED } from '../../../utils/constants'
import { getGraphElements } from '../../general/Graph/graphHelper'
import ChapterMapModal from './ChapterMapModal'
import GameMapContainer from './GameMapContainer'

function GameMap() {
  const [chaptersList, setChaptersList] = useState(undefined)
  const [graphElements, setGraphElements] = useState(null)
  const [isChapterMapOpen, setIsChapterMapOpen] = useState(false)
  const [chosenChapterId, setChosenChapterId] = useState(null)

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
      const graphInfo = chaptersList.map((chapter) => ({
        id: chapter.id,
        targetIds: chapter.id === Math.max(...chaptersList.map((c) => c.id)) ? [] : [chapter.id + 1],
        position: chapter.chapterPosition,
        edgeClass: 'gameMapEdge',
        nodeClass: 'gameMapNode'
      }))

      setGraphElements(getGraphElements(graphInfo))
    }
  }, [chaptersList])

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
            <h2 className={'text-center pt-2'}>Mapa gry</h2>
            <GameMapContainer
              elements={graphElements}
              nodeClickCallback={(nodeId) => setChosenChapterId({ id: nodeId })}
              labels={getNodesLabels()}
            />
          </>
        )}
      </Content>
      <ChapterMapModal show={isChapterMapOpen} setModalOpen={setIsChapterMapOpen} chapterId={chosenChapterId?.id} />
    </>
  )
}

export default GameMap
