import styled from 'styled-components'
import { TabsContainer as Tabs } from '../../professor/GradeListAndExport/GradeListAndExportStyles'

export const TabsContainer = styled(Tabs)`
  & + .tab-content {
    width: 100%;

    & > * {
      max-height: 55vh;
      overflow: auto;
    }
  }

  .nav-link:not(.active) {
    color: ${(props) => props.$linkColor} !important;
  }
`
