import expedition from '../storage/exampleExpeditionData.json';
import mapData from '../storage/exampleActivityMap.json';
import { START_GRAPH_NODE_ID } from './constants';

//for now we ignore IDs given for our mock

export function getStartQuestions(chapterID, expeditionID) {
    let startNode = expedition.graph.find(x => x.id === START_GRAPH_NODE_ID);
    let startQuestions = startNode.next.map(nextNodeId =>
        expedition.graph.find(x => x.id === nextNodeId)
    );
    return startQuestions;
}

export function getActivityMap(chapterID) {
    console.log(mapData);
    console.log(mapData.activityMap);
    console.log(mapData.activityMap.mapSizeX);
    console.log(mapData.activityMap.mapSizeY);
    return mapData;
}
