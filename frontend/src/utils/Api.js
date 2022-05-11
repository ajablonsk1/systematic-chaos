import expedition from '../storage/exampleExpeditionData.json';
import mapData from '../storage/exampleActivityMap.json';
import chapters from '../storage/exampleChapterList.json';
import { START_GRAPH_NODE_ID } from './constants';

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
    let question = expedition.graph[questionID];

    return {
        id: question.id,
        difficulty: question.difficulty,
        category: question.questionHint,
    };
}

export function getQuestion(expeditionID, questionID) {
    let question = expedition.graph[questionID];

    return {
        id: question.id,
        category: question.questionHint,
        points: question.points,
        content: question.question,
        answers: question.options,
        type: question.type,
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

//currently wrapped in "activityMap" since it will be probably an extracted part of chapter info

export function getActivityMap(chapterID) {
    return mapData;
}

//hard-coded expedition for now, will get correct activities later

export function getActivityAtID(chapterID, activityID) {
    return expedition;
}

//should be enough to get chapter selection working, activityMap handled by another API call

export function getChapters() {
    return chapters;
}
