import axios from 'axios';
import authHeader from '../services/auth-header';

const header = Object.assign(authHeader(), { 'Content-Type': 'application/x-www-form-urlencoded'});
const headerWithParams = params => Object.assign(header, { params });

export function axiosApiPost(url, body) {
    return axios.post(url, body, header)
        .then(response => response.data)
        .catch(error => console.log(error));
}

export function axiosApiGet(url, params) {
    return axios.get(url, headerWithParams(params))
        .then(response => response.data)
        .catch(error => console.log(error));
}

export function axiosApiDelete(url, params) {
    return axios.delete(url, headerWithParams(params))
        .then(response => response.data)
        .catch(error => console.log(error));
}

