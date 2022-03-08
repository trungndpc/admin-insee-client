import APIUtil from '../utils/APIUtils'

export default class FormModel {


    static findByPromotionId(promotionId) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/find-by-promotion?promotionId=${promotionId}`, resolve, reject);
        });
    }

    static statsByPromotion(promotionId) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/stats-by-promotion?promotionId=${promotionId}`, resolve, reject);
        });
    }


    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/get?id=${id}`, resolve, reject);
        });
    }

    static findLQForm(promotionId, topicId, page, pageSize) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/lq-form/find?promotionId=${promotionId}&topicId=${topicId}&page=${page}&pageSize=${pageSize}`, resolve, reject);
        });
    }

    static findStockForm(promotionIds, city, status, page, pageSize) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/find-by-promotions?promotionIds=${promotionIds}&page=${page}&pageSize=${pageSize}${(city && city != 0) ? ('&city=' + city) : ''}${(status && status != 0) ? ('&status=' + status) : ''}`, resolve, reject);
        });
    }

    static updateStatusTopic(promotionId, topicId, status) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/lighting-quiz/update-status-topic?id=${promotionId}&topicId=${topicId}&status=${status}`, resolve, reject);
        });
    }

    static updateStatus(formId, status, note) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/update-status?id=${formId}&status=${status}${note ? ('&note=' + note) : ''}`, resolve, reject);
        });
    }

    static statsFormBypromotion() {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/stats-form-promotion`, resolve, reject);
        });
    }

    static countByTypePromotion(status) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/count?${status && 'status=' + status}`, resolve, reject);
        });
    }

    static countFormByTypePromotion(type) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/count-by-type-promotion?type=${type}`, resolve, reject);
        });
    }

    static updateStockForm(id, form) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/stock-form/update?id=${id}`, JSON.stringify(form), resolve, reject);
        });
    }


}