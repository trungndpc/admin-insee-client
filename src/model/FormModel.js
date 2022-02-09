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

   
}