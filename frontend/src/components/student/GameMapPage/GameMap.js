import React, { useCallback, useEffect, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import ChapterService from '../../../services/chapter.service'
import Loader from '../../general/Loader/Loader'
import { ERROR_OCCURRED } from '../../../utils/constants'
import { getGraphElements } from '../../general/Graph/graphHelper'
import ChapterMapModal from './ChapterMapModal'
import GameMapContainer from './GameMapContainer'
import { isMobileView } from '../../../utils/mobileHelper'

function GameMap() {
  const [chaptersList, setChaptersList] = useState(undefined)
  const [graphElements, setGraphElements] = useState(null)
  const [isChapterMapOpen, setIsChapterMapOpen] = useState(false)
  const [chosenChapterId, setChosenChapterId] = useState(null)

  useEffect(() => {
    ChapterService.getChaptersList()
      .then((response) => {
        setChaptersList(response)
      })
      .catch(() => {
        setChaptersList(null)
      })
  }, [])

  useEffect(() => {
    if (chaptersList) {
      const graphInfo = chaptersList.map((chapter) => {
        const chapterIds = chaptersList.map((c) => c.id).sort((a, b) => a - b)
        return {
          id: chapter.id,
          targetIds:
            chapter.id === Math.max(...chapterIds) ? [] : [chaptersList[chapterIds.lastIndexOf(chapter.id) + 1]?.id],
          position: { x: chapter.posX, y: chapter.posY },
          edgeClass: 'gameMapEdge',
          nodeClass: 'gameMapNode',
          isBlocked: !chapter.isFulfilled
        }
      })

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
              customHeight={isMobileView() ? 700 : null}
            />
          </>
        )}
      </Content>
      <ChapterMapModal show={isChapterMapOpen} setModalOpen={setIsChapterMapOpen} chapterId={chosenChapterId?.id} />
    </>
  )
}

export default GameMap
