import expedition from '../storage/exampleExpeditionData.json';
import chapters from '../storage/exampleChapterList.json';
import { START_GRAPH_NODE_ID } from './constants';
import moment from "moment";
import 'moment/locale/pl';

//for now we ignore IDs given for our mock API calls

export function getStartQuestions(chapterID, expeditionID) {
    let startNode = expedition.graph.find(x => x.id === START_GRAPH_NODE_ID);
    let startQuestions = startNode.next.map(nextNodeId =>
        expedition.graph.find(x => x.id === nextNodeId)
    );
    return startQuestions;
}

export function getParentQuestions(parentID, expeditionID) {
    // todo: take the appropriate expedition from the expedition list in the future

    return expedition.graph
        .find(node => node.id === parentID)
        .next.map(questionId => getQuestionForDoor(expeditionID, questionId));


}

function getQuestionForDoor(expeditionId, questionID) {
    let question = expedition.graph.find(q => q.id === questionID);

    return {
        id: question.id,
        difficulty: question.difficulty,
        category: question.questionHint,
    };
}

export function getQuestion(expeditionID, questionID) {
    let question = expedition.graph.find(q => q.id === questionID);

    return {
        id: question.id,
        //hint
        category: question.questionHint,
        points: question.points,
        content: question.question,
        //options
        answers: question.options,
        type: question.type,
        //jest w type
        multipleChoice: question.multipleChoice,
    };
}
//check whether currentNodeID is not END_GRAPH_NODE_ID before function call

export function getNextQuestions(chapterID, expeditionID, currentNodeID) {
    let currentNode = expedition.graph.find(x => x.id === currentNodeID);
    let nextQuestions = currentNode.next.map(nextNodeId =>
        expedition.graph.find(x => x.id === nextNodeId)
    );
    return nextQuestions;
}

//hard-coded expedition for now, will get correct activities later

export function getActivityAtID(chapterID, activityID) {
    return expedition;
}

//should be enough to get chapter selection working, activityMap handled by another API call

export function getChapters() {
    return chapters;
}

export function getExpeditionPoints(expeditionId) {
    return getExpedition(expeditionId).points;
}

export function getExpedition(expeditionId) {
    // TODO: get expedition using expeditionId from expeditions list
    return expedition;
}

export function getExpeditionPointsClosed(expeditionId) {
    let expedition = getExpedition(expeditionId);
    return expedition.graph
        .filter(question => question.type === 'closed')
        .reduce((q1, q2) => q1.points + q2.points);
}

export const parseJwt = token => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.log(e);
        return null;
    }
};


export const getRemainingDate = (endDateString) => {
    const today = moment(new Date());
    const endDate = moment(new Date(endDateString));

    // duration
    return  Math.floor(moment.duration(endDate.diff(today)).asSeconds());
}

export const convertSecondsToStringInfo = (endDate) => {
    const seconds = getRemainingDate(endDate);
    const stringFormat = moment.utc(seconds * 1000).format('dd:mm:ss');
    const splitString = stringFormat.split(':');

    return `${splitString[0]} dni, ${splitString[1]} min, ${splitString[2]} sek`
}


