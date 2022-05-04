import APIUtil from '../utils/APIUtils'

export default class AccumulationModel {

    static list(promotionId, type, page, pageSize) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/accumulation/list?promotionId=${promotionId}&type=${type}&page=${page}&pageSize=${pageSize}`, resolve, reject);
        });
    }

}