import APIUtil from '../utils/APIUtils'

export default class LQPromotionModel {

    static create(topic, promotionId) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/lighting-quiz/create-topic?promotionId=${promotionId}`, JSON.stringify(topic), resolve, reject);
        });
    }

    static createOrUpdateQuestion(question, topicId, promotionId) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/lighting-quiz/create-or-update-question?promotionId=${promotionId}&topicId=${topicId}`, JSON.stringify(question), resolve, reject);
        });
    }

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/lighting-quiz/get?id=${id}`, resolve, reject);
        });
    }

    static getTopic(id, topicId) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/promotion/lighting-quiz/get-topic?id=${id}&topicId=${topicId}`, resolve, reject);
        });
    }
}