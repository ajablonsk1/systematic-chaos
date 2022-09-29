import React, { useEffect, useState } from 'react'
import { GraphContainer, GraphTrigger } from './InfoContainerStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons'
import Graph from '../../../../general/Graph/Graph'
import ExpeditionService from '../../../../../services/expedition.service'
import { getGraphElements, getNodeColor } from '../../../../general/Graph/graphHelper'

function GraphPreview(props) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [graphElements, setGraphElements] = useState([])
  const [size, setSize] = useState(0)
  const [questionsList, setQuestionsList] = useState([])

  useEffect(() => {
    ExpeditionService.getQuestionsList(props.activityId).then((response) => {
      setQuestionsList(response)
    })
  }, [props.activityId])

  useEffect(() => {
    setSize(isPreviewOpen ? '40%' : 0)
  }, [isPreviewOpen])

  useEffect(() => {
    const questions = questionsList.map((question) => {
      const isActualVisited =
        props.currentQuestionsPath[props.currentQuestionsPath.length - 1] === question.questionID ||
        (!props.currentQuestionsPath.length && !question.difficulty)

      return {
        id: question.questionID,
        borderColor: getNodeColor(question.difficulty),
        targetIds: question.nextQuestionsIDs,
        content: isActualVisited ? '★' : '',
        size: isActualVisited ? 40 : 20,
        backgroundColor: isActualVisited ? getNodeColor(question.difficulty) : 'white',
        customEdgeColorTargets: props.currentQuestionsPath.includes(question.questionID)
          ? question.nextQuestionsIDs.filter((q) => props.currentQuestionsPath.includes(q))
          : [],
        edgeStandardColor: 'gray',
        edgeSpecialColor: '#ffb30d',
        useBolderLines: true
      }
    })
    setGraphElements(getGraphElements(questions))
  }, [props.currentQuestionsPath, questionsList])

  return (
    <>
      <GraphTrigger onClick={() => setIsPreviewOpen(!isPreviewOpen)}>
        <FontAwesomeIcon icon={faDiagramProject} />
      </GraphTrigger>
      <GraphContainer style={{ width: size, height: size }}>
        <Graph elements={graphElements} height={'100%'} layoutName={'klay'} onNodeClick={() => {}} ungrabify />
      </GraphContainer>
    </>
  )
}

export default GraphPreview
