import APIUtil from '../utils/APIUtils'

export default class PostModel {

    static create(post) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/post/create`, JSON.stringify(post), resolve, reject);
        });
    }

    static list() {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/post/list`, resolve, reject);
        });
    }

    static getList() {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/post/get-list`, resolve, reject);
        });
    }

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/post/get?id=${id}`, resolve, reject);
        });
    }

    static updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/post/update-status?id=${id}&status=${status}`, resolve, reject);
        });
    }

}