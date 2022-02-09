import data from './lang.json'
const lang = window.data['lang'] ? window.data['lang'] : 'vi'
export default class Lang {
    static get(id) {
        return data[id][lang]
    }

    static toErrorMsg(error) {
        var id = this.getErrorCommand(error)
        return data[id][lang]
    }

    static getErrorCommand(error) {
        switch (error) {
            case -1: return "message.follow-fail-1"
            case -9: return "message.follow-fail-9"
            case -2005: return "message.follow-fail-2005"
            case -19: return "message.follow-fail-19"
            case -36: return "message.follow-fail-36"
            case -27: return "message.follow-fail-27"
            case -20: return "message.follow-fail-20"
            case -7: return "message.not-allow-to-follow"
            default:
                return "msg-native-fail"
        }
    }

    static getCateName(data) {
        switch (lang) {
            case 'vi': return data.name_vi;
            case 'en': return data.name_en;
            case 'my': return data.name_my;
            default: return data.name_vi;
        }
    }
}