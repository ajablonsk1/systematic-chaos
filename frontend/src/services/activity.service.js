import {axiosApiGet} from "../utils/axios";
import {ACTIVITY_MAP} from "./urls";

class ActivityService {
    getActivityMap(mapId) {
        return axiosApiGet(ACTIVITY_MAP, {activityMapId: mapId});
    }
}

export default new ActivityService();