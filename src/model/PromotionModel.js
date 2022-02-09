import APIUtil from '../utils/APIUtils'

export default class PromotionModel {

    static create(post) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/create`, JSON.stringify(post), resolve, reject);
        });
    }

    static list() {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/list`, resolve, reject);
        });
    }

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/get?id=${id}`, resolve, reject);
        });
    }


    static listPromotionForPost() {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/list-promotion-for-map-post`, resolve, reject);
        });
    }
}