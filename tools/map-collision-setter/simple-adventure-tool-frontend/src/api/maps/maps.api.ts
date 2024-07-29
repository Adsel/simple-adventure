import {getRequest} from "@/api/request/request.api";
import {API_CONFIG} from "@/config/config";

export const getMaps = () => {
    return getRequest(`${API_CONFIG.url}maps`, true);
};
