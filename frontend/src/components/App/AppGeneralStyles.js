import styled from 'styled-components';

const Content = styled.div`
    position: absolute;
    left: var(--sidebar-width);
    min-height: 100vh;
    padding: 0;

    @media (max-width: 768px) {
        left: 0;
        width: 100vw !important;
    }
`;

export const ContentWithMargin = styled(Content)`
    //width: var(--content-width-with-margin)!important;
    width: calc(var(--content-width-with-margin) - 2 * var(--content-margin-x));
    margin: var(--content-margin-y) var(--content-margin-x);
`;
export const ContentWithoutMargin = styled(Content)`
    width: var(--content-width-without-margin);
    margin: 0;
`;
