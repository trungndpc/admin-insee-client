import APIUtil from '../utils/APIUtils'

export default class UserModel {

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/user/get?id=${id}`, resolve, reject);
        });
    }

    static count() {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/user/count`, resolve, reject);
        });
    }

    static statsUserCity() {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/user/stats-user-city`, resolve, reject);
        });
    }

    static statsUserDate() {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/user/stats-user-date`, resolve, reject);
        });
    }

    static find(city, status, page, pageSize) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/user/find?page=${page}&pageSize=${pageSize}${(city && city != 0) ? ('&city=' + city) : ''}${(status && status != 0) ? ('&status=' + status) : ''}`, resolve, reject);
        });
    }

    static create(form) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/user/upload-customer`, JSON.stringify(form), resolve, reject);
        });
    }

    static update(id, form) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/user/update?id=${id}`, JSON.stringify(form), resolve, reject);
        });
    }

    static updateStatus(id, status, note) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/user/update-status?&uid=${id}&status=${status}${note ? ('&note=' + note) : ''}`, resolve, reject);
        });
    }

    static uploadFile(data) {
        const formData = new FormData();
        formData.append("file", data);
        return new Promise((resolve, reject) => {
            APIUtil.uploadFile(process.env.REACT_APP_DOMAIN + `/api/user/upload-customer-excel`, formData, resolve, reject);
        });
    }

}