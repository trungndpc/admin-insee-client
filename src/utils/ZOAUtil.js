
var extrSrc;
export default class ZOAUtil {

    static getSRC() {
        try {
            var url = window.location.href;
            extrSrc = {
                utm_source: this.getParameterByName("utm_source", url),
                utm_medium: this.getParameterByName("utm_medium", url),
                utm_campaign: this.getParameterByName("utm_campaign", url),
                z_campaign: this.getParameterByName("z_campaign", url),
                zarsrc: this.getParameterByName("zarsrc")
            };
            extrSrc = JSON.stringify(extrSrc);
        } catch (e) {
           var error = error + "|getSRC: " + e;
        }
        return extrSrc
    }


    static getParameterByName(name, url) {
        if (!url)
            url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
}