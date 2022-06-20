export const BASE_URL = 'http://localhost:8080/api/';
export const GRAPH_TASK_RESULT_URL = BASE_URL + 'task/graph/result';
export const GRAPH_TASK_URL = BASE_URL + 'task/graph';
export const PROF_FEEDBACK = BASE_URL + 'feedback/professor';
export const USER_FEEDBACK = BASE_URL + 'feedback/user';
export const GRAPH_TASK_POINTS = GRAPH_TASK_RESULT_URL + '/points';
export const USER_GROUP = BASE_URL + 'user/group';
export const GRAPH_GET_TASK_ANSWER_ID = GRAPH_TASK_RESULT_URL + '/add';
export const GRAPH_QUESTION = BASE_URL + 'question';
export const GRAPH_QUESTION_NEXT = GRAPH_QUESTION + '/next';
export const GRAPH_TASK_SEND_ANSWER = GRAPH_TASK_RESULT_URL + '/answer/add';
export const GRAPH_TASK_GET_MAX_AVAILABLE = GRAPH_TASK_POINTS + '/available';
export const GRAPH_TASK_GET_ALL_POINTS = GRAPH_TASK_POINTS + '/all';
export const GRAPH_TASK_GET_CLOSED_POINTS = GRAPH_TASK_POINTS + '/closed';
export const ACTIVITY_MAP = BASE_URL + 'map';
export const GRAPH_TASK_GET_MAX_AVAILABLE_ALL = GRAPH_TASK_GET_MAX_AVAILABLE + "/all";
export const GRAPH_TASK_GET_MAX_AVAILABLE_CLOSED = GRAPH_TASK_GET_MAX_AVAILABLE + "/closed";
export const GRAPH_TASK_GET_MAX_AVAILABLE_OPEN = GRAPH_TASK_GET_MAX_AVAILABLE + "/opened"
export const COMBAT_TASK_GET_INFO = BASE_URL + 'task/file';
export const COMBAT_TASK_RESULT_FILE = COMBAT_TASK_GET_INFO + '/result/file';
export const COMBAT_TASK_SEND_ANSWER = COMBAT_TASK_RESULT_FILE + '/add';
export const COMBAT_TASK_REMOVE_FILE = COMBAT_TASK_RESULT_FILE + '/delete';
export const COMBAT_TASK_GET_FILE = COMBAT_TASK_GET_INFO + '/getById';
export const INFORMATION_URL = BASE_URL + 'info';
export const SURVEY_TASK_GET_INFO = BASE_URL + 'survey';

