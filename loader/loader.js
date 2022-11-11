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

//create a single chapter and return id
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
  ACTIVITY_COUNT = fs.readdirSync(
    DATA_LOCATION + "/" + type + "/" + chapterNum
  ).length;
  return ACTIVITY_COUNT;
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

async function createAll() {
  for (let i = 1; i <= countChapters(); i++) {
    let currentId = await createChapter(i);
    await addExpeditionsInChapter(i, currentId);
    await addSurveysToChapter(i, currentId);
  }
}

//in loop for every chapter
//read chapter folder and get first (or nth)
//create chapter and get its id
//add expeditions for this id

//TODO
//add surveys for this id
//add info for this id
//add combat for this id

//manual reqs?

await login();
await createAll();
