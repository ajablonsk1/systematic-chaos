import styled from 'styled-components'

export const MultiStepProgressBar = styled.div`
  width: 50px;
  height: 2px;
  padding: 20px 0;

  position: relative;
  left: 50%;
  transform: translateX(-50%);

  border-top: 2px dashed ${(props) => props.$accentColor};

  &::before,
  &::after {
    content: '';
    display: flex;
    position: absolute;

    top: -8px;

    width: 14px;
    height: 14px;

    background-color: ${(props) => props.$accentColor};
    border-radius: 50%;
  }

  &::after {
    left: ${(props) => (props.$step === 2 ? `60px` : '52px')};
    outline: ${(props) => (props.$step === 2 ? `2px dashed ${props.$accentColor}` : 'none')};
    outline-offset: 5px;
  }

  &::before {
    left: ${(props) => (props.$step === 0 ? `-23px` : '-16px')};
    outline: ${(props) => (props.$step === 0 ? `2px dashed ${props.$accentColor}` : 'none')};
    outline-offset: 5px;
  }
`
