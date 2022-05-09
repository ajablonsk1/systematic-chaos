import expedition from '../storage/exampleExpeditionData.json';
import { START_GRAPH_NODE_ID } from './constants';

export function getStartQuestions() {
    let startNode = expedition.graph.find(x => x.id === START_GRAPH_NODE_ID);
    let startQuestions = startNode.next.map(nextNodeId =>
        expedition.graph.find(x => x.id === nextNodeId)
    );
    return startQuestions;
}
