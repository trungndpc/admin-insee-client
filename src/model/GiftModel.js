import APIUtil from '../utils/APIUtils'

export default class GiftModel {

    static create(formId, gift) {
        return new Promise((resolve, reject) => {
            APIUtil.postJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/gift/create?formId=${formId}`, JSON.stringify(gift), resolve, reject);
        });
    }

}