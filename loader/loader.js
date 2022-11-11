import axios from "axios";
import QueryString from "qs";
import * as fs from "fs";

const BASE_URL = "http://localhost:8080/api";
const EMAIL = "bmaj@agh.edu.pl";
const PASSWORD = "12345";

const CHAPTER_LOCATION = "./data/chapters";
const DATA_LOCATION = "./data";

let TOKEN = "";

//links
const POST_LOGIN = BASE_URL + "/login";
const GET_CHAPTER = BASE_URL + "/chapter";
const POST_CHAPTER_CREATE = BASE_URL + "/chapter" + "/create";
const POST_TASK_GRAPH_CREATE = BASE_URL + "/task/graph" + "/create";
const POST_SURVEY_CREATE = BASE_URL + "/survey" + "/create";
const POST_TASK_FILE_CREATE = BASE_URL + "/task" + "/file" + "/create";
const POST_INFO_CREATE = BASE_URL + "/info" + "/create";
const GET_TASK_REQUIREMENTS = BASE_URL + "/task" + "/requirements";
const GET_ACTIVITY_MAP = BASE_URL + "/map";
const POST_TASK_REQUIREMENTS_UPDATE =
  BASE_URL + "/task" + "/requirements" + "/update";

//utils
const readJson = (path) => {
  const file = fs.readFileSync(path);
  return JSON.parse(file);
};

const validHeader = (params) => ({
  headers: {
    ...{ Authorization: "Bearer " + TOKEN },
  },
  params: params,
});

//login and get token
async function login() {
  const loginInfo = await axios.post(
    POST_LOGIN,
    QueryString.stringify({
      email: EMAIL,
      password: PASSWORD,
    })
  );
  TOKEN = loginInfo.data.access_token;
}

async function createChapter(i) {
  const requestBody = readJson(CHAPTER_LOCATION + "/" + i.toString() + ".json");

  //create chapter
  await axios.post(POST_CHAPTER_CREATE, requestBody, validHeader());

  //grab id of the last chapter - that's the new one
  const chapterList = await axios.get(GET_CHAPTER, validHeader());
  const newChapterId = chapterList.data[chapterList.data.length - 1].id;

  return newChapterId;
}

function countChapters() {
  let CHAPTER_COUNT = 0;
  CHAPTER_COUNT = fs.readdirSync(CHAPTER_LOCATION).length;
  return CHAPTER_COUNT;
}

function countActivitiesForChapter(chapterNum, type) {
  let ACTIVITY_COUNT = 0;
  ACTIVITY_COUNT =
    fs.readdirSync(DATA_LOCATION + "/" + type + "/" + chapterNum).length - 1;
  return ACTIVITY_COUNT;
}

async function getTaskList(chapterId) {
  const activityMap = await axios.get(
    GET_ACTIVITY_MAP,
    validHeader({ activityMapId: chapterId })
  );
  const taskList = activityMap.data.tasks;
  return taskList;
}

async function createExpedition(chapterNum, chapterId, activityNum) {
  const expeditionContent = readJson(
    DATA_LOCATION +
      "/expedition/" +
      chapterNum +
      "/" +
      activityNum.toString() +
      ".json"
  );
  await axios.post(
    POST_TASK_GRAPH_CREATE,
    {
      chapterId: chapterId,
      form: expeditionContent,
    },
    validHeader()
  );
}

async function addExpeditionsInChapter(chapterNum, chapterId) {
  const ACTIVITY_COUNT = countActivitiesForChapter(chapterNum, "expedition");
  for (let i = 1; i <= ACTIVITY_COUNT; i++) {
    await createExpedition(chapterNum, chapterId, i);
  }
}

async function createSurvey(chapterNum, chapterId, surveyNum) {
  const surveyContent = readJson(
    DATA_LOCATION +
      "/survey/" +
      chapterNum +
      "/" +
      surveyNum.toString() +
      ".json"
  );
  await axios.post(
    POST_SURVEY_CREATE,
    {
      chapterId: chapterId,
      form: surveyContent,
    },
    validHeader()
  );
}

async function addSurveysToChapter(chapterNum, chapterId) {
  const ACTIVITY_COUNT = countActivitiesForChapter(chapterNum, "survey");
  for (let i = 1; i <= ACTIVITY_COUNT; i++) {
    await createSurvey(chapterNum, chapterId, i);
  }
}

async function createFileTask(chapterNum, chapterId, fileTaskNum) {
  const fileTaskContent = readJson(
    DATA_LOCATION +
      "/combat/" +
      chapterNum +
      "/" +
      fileTaskNum.toString() +
      ".json"
  );
  await axios.post(
    POST_TASK_FILE_CREATE,
    {
      chapterId: chapterId,
      form: fileTaskContent,
    },
    validHeader()
  );
}

async function addFileTasksToChapter(chapterNum, chapterId) {
  const ACTIVITY_COUNT = countActivitiesForChapter(chapterNum, "combat");
  for (let i = 1; i <= ACTIVITY_COUNT; i++) {
    await createFileTask(chapterNum, chapterId, i);
  }
}

async function createInfoTask(chapterNum, chapterId, infoTaskNum) {
  const infoTaskContent = readJson(
    DATA_LOCATION +
      "/info/" +
      chapterNum +
      "/" +
      infoTaskNum.toString() +
      ".json"
  );
  await axios.post(
    POST_INFO_CREATE,
    {
      chapterId: chapterId,
      form: infoTaskContent,
    },
    validHeader()
  );
}

async function addInfoTasksToChapter(chapterNum, chapterId) {
  const ACTIVITY_COUNT = countActivitiesForChapter(chapterNum, "info");
  for (let i = 1; i <= ACTIVITY_COUNT; i++) {
    await createInfoTask(chapterNum, chapterId, i);
  }
}

async function addRequirementToSingleActivity(
  chapterNum,
  activityNum,
  activityId,
  type
) {
  const currentRequirementsData = await axios.get(
    GET_TASK_REQUIREMENTS,
    validHeader({
      activityId: activityId.id,
    })
  );
  const newRequirementsData = readJson(
    DATA_LOCATION +
      "/" +
      type +
      "/" +
      chapterNum +
      "/requirements/" +
      activityNum.toString() +
      ".json"
  );

  const newRequirementsDataWithIds = newRequirementsData.requirements.map(
    (el) => {
      const attributeId = currentRequirementsData.data.requirements.find(
        (originalEl) => originalEl.name === el.name
      ).id;
      return { id: attributeId, selected: el.selected, value: el.value };
    }
  );

  await axios.post(
    POST_TASK_REQUIREMENTS_UPDATE,
    {
      activityId: activityId.id,
      isBlocked: false,
      requirements: newRequirementsDataWithIds,
    },
    validHeader()
  );
}

async function addRequirementsToTypeTasksInChapter(
  chapterNum,
  activityIds,
  type
) {
  for (let i = 1; i <= countActivitiesForChapter(chapterNum, type); i++) {
    addRequirementToSingleActivity(chapterNum, i, activityIds[i - 1], type);
  }
}

async function addRequirementsToTasksInChapter(chapterNum, taskList) {
  //we get an array here with activities added in order as those are created
  const infoIds = taskList.filter((el) => el.type === "INFO");
  const expeditionIds = taskList.filter((el) => el.type === "EXPEDITION");
  const surveyIds = taskList.filter((el) => el.type === "SURVEY");
  const taskIds = taskList.filter((el) => el.type === "TASK");

  addRequirementsToTypeTasksInChapter(chapterNum, infoIds, "info");
  addRequirementsToTypeTasksInChapter(chapterNum, expeditionIds, "expedition");
  addRequirementsToTypeTasksInChapter(chapterNum, surveyIds, "survey");
  addRequirementsToTypeTasksInChapter(chapterNum, taskIds, "combat");
}

async function createAll() {
  for (let i = 1; i <= countChapters(); i++) {
    let currentId = await createChapter(i);
    await addInfoTasksToChapter(i, currentId);
    await addExpeditionsInChapter(i, currentId);
    await addSurveysToChapter(i, currentId);
    await addFileTasksToChapter(i, currentId);
    const taskList = await getTaskList(currentId);
    await addRequirementsToTasksInChapter(i, taskList);
  }
}

await login();
await createAll();
