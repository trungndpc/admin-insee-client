import APIUtil from '../utils/APIUtils'

export default class PromotionModel {

    static create(post) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/create`, JSON.stringify(post), resolve, reject);
        });
    }

    static update(post) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/update`, JSON.stringify(post), resolve, reject);
        });
    }

    static list(types) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/list?${types ? ('types=' + types) : ''}`, resolve, reject);
        });
    }

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/get?id=${id}`, resolve, reject);
        });
    }

    static updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/update-status?id=${id}&status=${status}`, resolve, reject);
        });
    }


    static listPromotionForPost() {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/list-promotion-for-map-post`, resolve, reject);
        });
    }
}