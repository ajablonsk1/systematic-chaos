import styled from 'styled-components'
import { Card, Col } from 'react-bootstrap'

const ChapterCard = styled(Card)`
  color: var(--font-color);

  .card-header {
    font-weight: bold;
    letter-spacing: 1px;
    background-color: var(--dark-blue);
  }

  .card-body {
    background-color: #223762;
  }
`

export const MapCard = styled(ChapterCard)`
  .card-body {
    padding: 0;
    max-height: 43vh !important;
    height: 43vh !important;
  }
`
export const SummaryCard = styled(ChapterCard)`
  overflow-y: auto;
  overflow-x: hidden;

  .list-group-item {
    background-color: #223762;
  }

  #activities,
  #conditions {
    border-top: 1px solid gray;
    margin-top: 5px;
    padding-top: 5px;
    color: gray;
  }
`
export const ActivitiesCard = styled(ChapterCard)`
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  .list-group-item {
    background-color: #223762;
    display: flex;
    align-items: center;
  }
  .list-group:hover {
    background-color: var(--dark-blue);
    cursor: pointer;

    & .list-group-item {
      background-color: transparent;
    }
  }
`
export const ButtonsCol = styled(Col)`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;

  position: relative;
  bottom: 1.5rem;
`
