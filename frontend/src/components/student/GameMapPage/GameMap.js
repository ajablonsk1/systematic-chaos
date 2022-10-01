import React, { useCallback, useEffect, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import Loader from '../../general/Loader/Loader'
import { ERROR_OCCURRED } from '../../../utils/constants'
import { getGraphElements } from '../../general/Graph/graphHelper'
import ChapterMapModal from './ChapterMapModal'
import GameMapContainer from './GameMapContainer'
import { useGetChapterQuery } from '../../../api/hooks/chapterController.hooks'

function GameMap() {
  const [graphElements, setGraphElements] = useState(null)
  const [isChapterMapOpen, setIsChapterMapOpen] = useState(false)
  const [chosenChapterId, setChosenChapterId] = useState(null)

  const chapterData = useGetChapterQuery()

  useEffect(() => {
    if (chapterData.data) {
      const graphInfo = chapterData.data.map((chapter) => ({
        id: chapter.id,
        targetIds: chapter.id === Math.max(...chapterData.data.map((c) => c.id)) ? [] : [chapter.id + 1],
        position: { x: chapter.posX, y: chapter.posY },
        edgeClass: 'gameMapEdge',
        nodeClass: 'gameMapNode'
      }))

      setGraphElements(getGraphElements(graphInfo))
    }
  }, [chapterData.data])

  useEffect(() => {
    if (chosenChapterId) {
      setIsChapterMapOpen(true)
    }
  }, [chosenChapterId])

  const getNodesLabels = useCallback(() => {
    if (chapterData.data) {
      return chapterData.data.map((chapter) => ({
        id: chapter.id,
        label: chapter.name
      }))
    }
    return null
  }, [chapterData.data])

  return (
    <>
      <Content className={'vh-100'}>
        {chapterData.isFetching ? (
          <Loader />
        ) : chapterData.isError ? (
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
