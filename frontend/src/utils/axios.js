import axios from 'axios';
import authHeader from '../services/auth-header';

const header = Object.assign(authHeader(), { 'Content-Type': 'application/x-www-form-urlencoded' });

export function axiosApi(method, url, body) {
    const config = {
        method: method,
        url: url,
        headers: header,
        data: body,
    };
    return axios(config)
        .then(response => response.data)
        .catch(error => console.log(error));
}
