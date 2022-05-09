import styled from "styled-components";

const Content = styled.div`
  position: absolute;
  left: var(--sidebar-width);
  height: 100vh;
  padding: 0;
`;

export const ContentWithMargin = styled(Content)`
  //width: var(--content-width-with-margin)!important;
  width: calc(var(--content-width-with-margin) - 2*var(--content-margin-x))!important;
  margin: var(--content-margin-y) var(--content-margin-x);
`
export const ContentWithoutMargin = styled(Content)`
  width: var(--content-width-without-margin)!important;
  margin: 0;
`;
