import APIUtil from '../utils/APIUtils'

export default class GiftModel {

    static create(formId, gift) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/gift/create?formId=${formId}`, JSON.stringify(gift), resolve, reject);
        });
    }

    static count(status) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/gift/count`, resolve, reject);
        });
    }

    static find(status, page, pageSize) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/gift/find?page=${page}&pageSize=${pageSize}${(status && status != 0) ? ('&status=' + status) : ''}`, resolve, reject);
        });
    }

}