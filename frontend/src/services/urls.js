export const BASE_URL = 'http://localhost:8080/api'

/* Rule of naming URLs:
 *  METHOD_URL_FULL_PATH (excluding keywords like "set", "get", "put", "post", "add")
 * @examples:
 * 1. task/graph/result (get) -> GET_TASK_GRAPH_RESULT
 * 2. feedback/professor (get) -> GET_FEEDBACK_PROFESSOR
 * 3. user/index/set (post) -> POST_USER_INDEX
 *
 * The exception to the rule:
 *  - If we create base urls for controllers, we can call them like a repeating part of the path in the controller
 * */

// User Controller
export const POST_LOGIN = BASE_URL + '/login'
export const PUT_PASSWORD_EDITION = BASE_URL + '/password-edition'
export const POST_USER_INDEX = BASE_URL + '/user/index/set'
export const POST_USER_GROUP = BASE_URL + '/user/group/set'
export const POST_REGISTER = BASE_URL + '/register'
export const GET_USER_GROUP = BASE_URL + '/user/group'
export const GET_USER_CURRENT = BASE_URL + '/user/current'
export const GET_TOKEN_REFRESH = BASE_URL + '/token/refresh'
export const GET_STUDENTS_WITH_GROUP_ALL = BASE_URL + '/students-with-group/all'
export const GET_PROFESSOR_REGISTER_TOKEN = BASE_URL + '/professor/register/token'
export const GET_PROFESSOR_EMAILS = BASE_URL + '/user/professor/emails'
export const DELETE_USER_STUDENT = BASE_URL + '/user/delete-student'
export const DELETE_USER_PROFESSOR = BASE_URL + '/user/delete-professor'

// Chapter Controller
export const GET_CHAPTER = BASE_URL + '/chapter'
export const PUT_CHAPTER_EDIT = GET_CHAPTER + '/edit'
export const POST_CHAPTER_CREATE = GET_CHAPTER + '/create'
export const GET_CHAPTER_INFO = GET_CHAPTER + '/info'
export const DELETE_CHAPTER = GET_CHAPTER + '/delete'
export const GET_CHAPTER_REQUIREMENTS = GET_CHAPTER + '/requirements'
export const POST_CHAPTER_REQUIREMENTS_UPDATE = GET_CHAPTER_REQUIREMENTS + '/update'

// Task Result Controller
export const TASK_RESULT = BASE_URL + '/task/result'
export const POST_TASK_RESULT_CSV = TASK_RESULT + '/csv'
export const GET_TASK_RESULT_POINTS_STATISTICS = TASK_RESULT + '/points/statistics'
export const GET_TASK_RESULT_ACTIVITY_STATISTICS = TASK_RESULT + '/activity/statistics'

// Task Controller
export const TASK = BASE_URL + '/task'
export const POST_TASK_REQUIREMENTS = TASK + '/requirements/update'
export const GET_TASK_REQUIREMENTS = TASK + '/requirements'
export const GET_TASK_EVALUATE_FIRST = TASK + '/evaluate/first'
export const GET_TASK_EVALUATE_ALL = TASK + '/evaluate/all'
export const GET_TASK_ACTIVITIES = TASK + '/activities'

// Graph Task Result Controller
export const GET_TASK_GRAPH_RESULT = BASE_URL + '/task/graph/result'
export const POST_TASK_GRAPH_RESULT_START = GET_TASK_GRAPH_RESULT + '/start'
export const GET_TASK_GRAPH_RESULT_TIME_REMAINING = GET_TASK_GRAPH_RESULT + '/time-remaining'
export const GET_TASK_GRAPH_RESULT_POINTS_OPENED = GET_TASK_GRAPH_RESULT + '/points/opened'
export const GET_TASK_GRAPH_RESULT_POINTS_CLOSED = GET_TASK_GRAPH_RESULT + '/points/closed'
export const GET_TASK_GRAPH_RESULT_POINTS_AVAILABLE_OPENED = GET_TASK_GRAPH_RESULT + '/points/available/opened'
export const GET_TASK_GRAPH_RESULT_POINTS_AVAILABLE_CLOSED = GET_TASK_GRAPH_RESULT + '/points/available/closed'
export const GET_TASK_GRAPH_RESULT_POINTS_AVAILABLE_ALL = GET_TASK_GRAPH_RESULT + '/points/available/all'
export const GET_TASK_GRAPH_RESULT_POINTS_ALL = GET_TASK_GRAPH_RESULT + '/points/all'
export const GET_TASK_GRAPH_RESULT_SUPER_POWER = GET_TASK_GRAPH_RESULT + '/super-power'
export const GET_TASK_GRAPH_RESULT_SUPER_POWER_CAN_USE = GET_TASK_GRAPH_RESULT + 'super-power/can-use'

// Graph Task Controller
export const GET_TASK_GRAPH = BASE_URL + '/task/graph'
export const GET_TASK_GRAPH_CREATE = GET_TASK_GRAPH + '/create'
export const POST_TASK_GRAPH_CREATE = GET_TASK_GRAPH + '/create'
export const GET_TASK_GRAPH_MAP = GET_TASK_GRAPH + '/map'

// File Task Result Controller
export const GET_TASK_FILE_RESULT_FILE = BASE_URL + '/task/file/result/file'
export const POST_TASK_FILE_RESULT_FILE = GET_TASK_FILE_RESULT_FILE + '/add'
export const DELETE_TASK_FILE_RESULT_FILE = GET_TASK_FILE_RESULT_FILE + '/delete'

// File Task Controller
export const GET_TASK_FILE = BASE_URL + '/task/file'
export const GET_TASK_FILE_CREATE = GET_TASK_FILE + '/create'
export const POST_TASK_FILE_CREATE = GET_TASK_FILE + '/create'

// Survey Controller
export const GET_SURVEY = BASE_URL + '/survey'
export const GET_SURVEY_CREATE = GET_SURVEY + '/create'
export const POST_SURVEY_CREATE = GET_SURVEY + '/create'

// Survey Result Controller
export const GET_SURVEY_RESULT = BASE_URL + '/survey/result'
export const POST_SURVEY_RESULT = BASE_URL + '/survey/result'

// Question Controller
const GET_QUESTION = BASE_URL + '/question' // TODO: unused endpoint
export const POST_QUESTION_ACTION = GET_QUESTION + '/action'
export const GET_QUESTION_INFO = GET_QUESTION + '/get-info'

// Info Controller
export const GET_INFO = BASE_URL + '/info'
export const GET_INFO_CREATE = GET_INFO + '/create'
export const POST_INFO_CREATE = GET_INFO + '/create'

// Group Controller
export const POST_GROUP = BASE_URL + '/group'
export const GET_GROUP_USERS = POST_GROUP + '/users'
export const GET_GROUP_STUDENTS = POST_GROUP + '/students'
export const GET_GROUP_PROFESSORS = POST_GROUP + '/professors'
export const GET_GROUP_INVITATION_CODE_LIST = POST_GROUP + '/invitation-code/list'

// User Feedback Controller
export const POST_FEEDBACK_USER = BASE_URL + '/feedback/user'

// Professor Feedback Controller
export const POST_FEEDBACK_PROFESSOR = BASE_URL + '/feedback/professor'
export const GET_FEEDBACK_PROFESSOR = POST_FEEDBACK_PROFESSOR + '/get'
export const GET_FEEDBACK_PROFESSOR_GET_BY_FILE_TASK_RESULT_ID = POST_FEEDBACK_PROFESSOR + '/get/by-file-task-result-id'

// Additional Points Controller
export const GET_ADDITIONAL_POINTS = BASE_URL + '/additional/points'
export const POST_ADDITIONAL_POINTS = GET_ADDITIONAL_POINTS + '/add'

// Summary Controller
export const GET_SUMMARY = BASE_URL + '/summary'

// Ranking Controller
export const GET_RANKING = BASE_URL + '/ranking'
export const GET_RANKING_SEARCH = GET_RANKING + '/search'
export const GET_RANKING_POSITION = GET_RANKING + '/position'
export const GET_RANKING_GROUP = GET_RANKING + '/group'
export const GET_RANKING_GROUP_POSITION = GET_RANKING + '/group/position'
export const GET_RANKING_ACTIVITY = GET_RANKING + '/activity'
export const GET_RANKING_ACTIVITY_SEARCH = GET_RANKING + '/activity/search'

// All Points Controller
const POINTS_ALL = BASE_URL + '/points/all'
export const GET_POINTS_ALL_TOTAL = POINTS_ALL + '/total'
export const GET_POINTS_ALL_LIST_STUDENT = POINTS_ALL + '/list/student'
export const GET_POINTS_ALL_LIST_PROFESSOR = POINTS_ALL + '/list/professor'

// Activity Map Controller
export const GET_MAP = BASE_URL + '/map'

// File Controller
export const GET_FILE = BASE_URL + '/file'
export const GET_FILE_CHAPTER_IMAGES = GET_FILE + '/chapter/images'

// Dashboard Controller
export const GET_DASHBOARD = BASE_URL + '/dashboard'

// Activity Controller
const ACTIVITY = BASE_URL + '/activity'
export const POST_ACTIVITY_EDIT = ACTIVITY + '/edit'
export const GET_ACTIVITY_EDIT_INFO = ACTIVITY + '/edit/info'
export const DELETE_ACTIVITY = ACTIVITY + '/delete'

// Ranks Controller
const RANK = BASE_URL + '/rank'
export const PUT_RANK_UPDATE = RANK + '/update'
export const POST_RANK = RANK + '/add'
export const GET_RANK_CURRENT = RANK + '/current'
export const GET_RANK_ALL = RANK + '/all'
export const DELETE_RANK = RANK + '/delete'

// Badges Controller
const BADGE = BASE_URL + '/badge'
export const GET_BADGE_ALL = BADGE + '/all'
export const GET_BADGE_UNLOCKED_ALL = BADGE + '/unlocked/all'
export const DELETE_BADGE = BADGE + '/delete'
export const ADD_BADGE = BADGE + '/add'
export const PUT_BADGE_UPDATE = BADGE + '/update'

// Grade Controller
export const GET_GRADES = BASE_URL + '/grades'

// Hero Controller
export const PUT_HERO = BASE_URL + '/hero'
