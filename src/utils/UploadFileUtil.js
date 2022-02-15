import 'whatwg-fetch';
let fetch = window.fetch;

export default class UploadFileUtil {
    static async uploadImg(photo) {
        let formData = new FormData();
        formData.append("file", photo);

        const ctrl = new AbortController() 
        setTimeout(() => ctrl.abort(), 5000);

        try {
            return await fetch('https://cuahang.insee.udev.com.vn/upload/image', { method: "POST", body: formData })
                .then(resp => resp.json());
        } catch (e) {
            console.log('Huston we have problem...:', e);
        }
    }
}