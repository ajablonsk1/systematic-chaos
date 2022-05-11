export const PageRoutes = {
    HOME: '/',
    QUESTION_SELECTION: '/doors-selection/:expeditionId/:parentId',
    QUESTION_ANSWER: '/question/:expeditionId/:id',
    EXPEDITION_INFO: '/expedition-info/:id',
    // TODO: add new path routes in the future
};

export const UserSidebarTitles = {
    [PageRoutes.HOME]: 'Strona Główna',
    // TODO: add new elements to the map according to the sidebar in Figma, e.g. [PathRoutes.GAME_MAP]: "Mapa Gry"
};

export const TeacherSidebarTitles = {
    // TODO
};

export const START_GRAPH_NODE_ID = -1;
export const END_GRAPH_NODE_ID = -2;
