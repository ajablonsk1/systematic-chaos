import expedition from '../storage/exampleExpeditionData.json';
import chapters from '../storage/exampleChapterList.json';
import { START_GRAPH_NODE_ID } from './constants';

export function getStartQuestions() {
    let startNode = expedition.graph.find(x => x.id === START_GRAPH_NODE_ID);
    let startQuestions = startNode.next.map(nextNodeId =>
        expedition.graph.find(x => x.id === nextNodeId)
    );
    return startQuestions;
}

//should be enough to get chapter selection working, activityMap handled by another API call

export function getChapters() {
    return chapters;
}
