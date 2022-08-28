export const BASE_URL = 'http://localhost:8080/api/'
export const GRAPH_TASK_RESULT_URL = BASE_URL + 'task/graph/result'
export const GRAPH_TASK_URL = BASE_URL + 'task/graph'
export const PROF_FEEDBACK = BASE_URL + 'feedback/professor'
export const USER_FEEDBACK = BASE_URL + 'feedback/user'
export const GRAPH_TASK_POINTS = GRAPH_TASK_RESULT_URL + '/points'
export const USER_GROUP = BASE_URL + 'user/group'
export const USER_DATA = BASE_URL + 'user/current'
export const SET_INDEX_NUMBER = BASE_URL + 'user/index/set'
export const GRAPH_GET_TASK_ANSWER_ID = GRAPH_TASK_RESULT_URL + '/save'
export const GRAPH_QUESTION = BASE_URL + 'question'
export const GRAPH_QUESTION_NEXT = GRAPH_QUESTION + '/next'
export const GRAPH_TASK_SEND_ANSWER = GRAPH_TASK_RESULT_URL + '/answer/add'
export const GRAPH_TASK_GET_MAX_AVAILABLE = GRAPH_TASK_POINTS + '/available'
export const GRAPH_TASK_GET_ALL_POINTS = GRAPH_TASK_POINTS + '/all'
export const GRAPH_TASK_GET_CLOSED_POINTS = GRAPH_TASK_POINTS + '/closed'
export const ACTIVITY_MAP = BASE_URL + 'map'
export const GRAPH_TASK_GET_MAX_AVAILABLE_ALL = GRAPH_TASK_GET_MAX_AVAILABLE + '/all'
export const GRAPH_TASK_GET_MAX_AVAILABLE_CLOSED = GRAPH_TASK_GET_MAX_AVAILABLE + '/closed'
export const GRAPH_TASK_GET_MAX_AVAILABLE_OPEN = GRAPH_TASK_GET_MAX_AVAILABLE + '/opened'
export const COMBAT_TASK_GET_INFO = BASE_URL + 'task/file'
export const COMBAT_TASK_RESULT_FILE = COMBAT_TASK_GET_INFO + '/result/file'
export const COMBAT_TASK_SEND_ANSWER = COMBAT_TASK_RESULT_FILE + '/add'
export const COMBAT_TASK_REMOVE_FILE = COMBAT_TASK_RESULT_FILE + '/delete'
export const COMBAT_TASK_GET_FILE = COMBAT_TASK_GET_INFO + '/getById'
export const INFORMATION_URL = BASE_URL + 'info'
export const SURVEY_TASK_GET_INFO = BASE_URL + 'survey'
export const GROUP = BASE_URL + 'group'
export const GET_GROUPS = BASE_URL + 'group/invitation-code/list'
export const GET_ALL_STUDENTS = BASE_URL + 'students-with-group/all'
export const GET_GROUP_STUDENTS = GROUP + '/users'
export const SET_STUDENT_GROUP = USER_GROUP + '/set'
export const GET_CSV = BASE_URL + 'task/result/csv'
export const GET_TASKS_TO_EVALUATE = BASE_URL + 'task/evaluate/all'
export const SET_START_TIME = GRAPH_TASK_RESULT_URL + '/start-date/set'
export const GET_FIRST_TASK_TO_EVALUATE = BASE_URL + 'task/evaluate/first'
export const GET_REMAINING_TIME = GRAPH_TASK_RESULT_URL + '/time-remaining'
export const SEND_EXPEDITION_FINISHED_TIME = GRAPH_TASK_RESULT_URL + '/send-date/set'
export const GET_POINTS_STATISTICS = BASE_URL + 'task/result/points/statistics'
export const GET_BONUS_POINTS = BASE_URL + 'additional/points'
export const ADD_BONUS_POINTS = GET_BONUS_POINTS + '/add'
export const PROF_FEEDBACK_ADD_FILE = PROF_FEEDBACK + '/file/add'
export const GET_ACTIVITIES_LIST = BASE_URL + 'task/activities'
export const GET_RANKING = BASE_URL + 'ranking'
export const GET_STUDENT_GROUP_RANKING = GET_RANKING + '/group'
export const GET_FILTERED_RANKING = GET_RANKING + '/search'
export const GET_STUDENT_POINTS_PROFESSOR = BASE_URL + 'points/all/list/professor'
export const GET_STUDENT_GLOBAL_POSITION = GET_RANKING + '/position'
export const GET_STUDENT_GROUP_POSITION = GET_RANKING + '/group/position'
export const GET_RECEIVED_TOTAL_POINTS = BASE_URL + 'points/all/total'
export const GET_ACTIVITY_RESULT_LIST = GET_RANKING + '/activity'
export const GET_FILTERED_ACTIVITY_RESULT_LIST = GET_ACTIVITY_RESULT_LIST + '/search'
export const GET_CHAPTER_LIST = BASE_URL + 'chapter'
export const GET_CHAPTER_DETAILS = GET_CHAPTER_LIST + '/info'
