import APIUtil from '../utils/APIUtils'

export default class GreetingFormModel {

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/greeting-friend/get?id=${id}`, resolve, reject);
        });
    }

    static findByPromotionId(promotionId) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/greeting-friend/find-by-promotion?promotionId=${promotionId}`, resolve, reject);
        });
    }


    static updateStatus(formId, status, note) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/greeting-friend/update-status?id=${formId}&status=${status}${note ? ('&note=' + note) : ''}`, resolve, reject);
        });
    }


    static updateStockForm(id, form) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/form/greeting-friend/update?id=${id}`, JSON.stringify(form), resolve, reject);
        });
    }

}