import APIUtil from '../utils/APIUtils'

export default class PredictMatchFootballFormModel {

    static list(matchId, page, pageSize) {
        return new Promise((resolve, reject) => {
            APIUtil.getJSONWithCredentials(process.env.REACT_APP_DOMAIN + `/api/match-football-form/list?matchId=${matchId}&page=${page}&pageSize=${pageSize}`, resolve, reject);
        });
    }

}