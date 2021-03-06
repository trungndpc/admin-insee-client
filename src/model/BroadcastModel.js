import APIUtil from '../utils/APIUtils'

export default class BroadcastModel {

    static create(form) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/broadcast/create`, JSON.stringify(form), resolve, reject);
        });
    }

    static update(id, form) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/broadcast/update?id=${id}`, JSON.stringify(form), resolve, reject);
        });
    }

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/broadcast/get?id=${id}`, resolve, reject);
        });
    }

    static list() {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/broadcast/find`, resolve, reject);
        });
    }

    static updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/broadcast/update-status?id=${id}&status=${status}`, resolve, reject);
        });
    }

}