import styled from 'styled-components'

export const MultiStepProgressBar = styled.div`
  width: 124px;
  height: 2px;
  padding: 20px 0;
  border-top: 2px dashed ${(props) => props.$accentColor};
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  & > div {
    position: absolute;
    width: 14px;
    height: 14px;
    background-color: ${(props) => props.$accentColor};
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
    top: -8px;
    outline: ${(props) => (props.$step === 1 ? `2px dashed ${props.$accentColor}` : 'none')};
  }

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
    outline-offset: 5px;
  }

  &::after {
    right: ${(props) => (props.$step === 2 ? `-23px` : '-16px')};
    outline: ${(props) => (props.$step === 2 ? `2px dashed ${props.$accentColor}` : 'none')};
  }

  &::before {
    left: ${(props) => (props.$step === 0 ? `-23px` : '-16px')};
    outline: ${(props) => (props.$step === 0 ? `2px dashed ${props.$accentColor}` : 'none')};
  }
`
