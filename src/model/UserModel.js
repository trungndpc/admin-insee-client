import APIUtil from '../utils/APIUtils'

export default class UserModel {

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/user/get?id=${id}`, resolve, reject);
        });
    }


    static find(page, pageSize) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/user/find?page=${page}&pageSize=${pageSize}`, resolve, reject);
        });
    }

    static create(form) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/user/upload-customer`, JSON.stringify(form), resolve, reject);
        });
    }

    static updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/user/update-status?&uid=${id}&status=${status}`, resolve, reject);
        });
    }

}