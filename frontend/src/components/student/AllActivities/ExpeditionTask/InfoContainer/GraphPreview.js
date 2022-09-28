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
  const lastQuestionId = localStorage.getItem('lastQuestionId')

  useEffect(() => {
    if (props.actualQuestionId) {
      localStorage.setItem('lastQuestionId', props.actualQuestionId.toString())
    }
  }, [props.actualQuestionId])

  useEffect(() => {
    ExpeditionService.getQuestionsList(props.activityId).then((response) => {
      setQuestionsList(response)
    })
  }, [props.activityId])

  useEffect(() => {
    setSize(isPreviewOpen ? '40%' : 0)
  }, [isPreviewOpen])

  useEffect(() => {
    const questions = questionsList.map((question) => ({
      id: question.questionID,
      borderColor: getNodeColor(question.difficulty),
      targetIds: question.nextQuestionsIDs,
      content: lastQuestionId === question.questionID || (!lastQuestionId && !question.difficulty) ? '★' : '',
      size: lastQuestionId === question.questionID || (!lastQuestionId && !question.difficulty) ? 40 : 20,
      backgroundColor:
        lastQuestionId === question.questionID || (!lastQuestionId && !question.difficulty)
          ? getNodeColor(question.difficulty)
          : 'white'
    }))
    setGraphElements(getGraphElements(questions))
  }, [lastQuestionId, questionsList])

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
