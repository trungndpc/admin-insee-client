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

    static endTopic(promotionId, topicId) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/lighting-quiz/end-topic?id=${promotionId}&topicId=${topicId}`, resolve, reject);
        });
    }
    
    static updateStatus(formId, status) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/update-status?id=${formId}&status=${status}`, resolve, reject);
        });
    }


}