import styled from 'styled-components'
import { Tooltip } from 'react-bootstrap'

export const CustomTooltip = styled(Tooltip)`
  & > .tooltip-inner {
    max-width: 300px;
    margin-left: 15px;
  }
`
