import APIUtil from '../utils/APIUtils'

export default class MatchFootballModel {

    static list(promotionId, page, pageSize) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/match-football/list?promotionId=${promotionId}&page=${page}&pageSize=${pageSize}`, resolve, reject);
        });
    }

}