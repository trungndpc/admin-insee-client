import 'whatwg-fetch';
let fetch = window.fetch;

export default class APIUtils {
  static getJSONWithCredentials(url, success, error) {
    fetch(url, {
      method: 'get',
      credentials: 'include'
    })
      .then(resp => {
        return resp.json();
      })
      .then(returnedValue => {
        success(returnedValue);
      })
      .catch(function (ex) {
        if (error) {
          error(ex);
        }
      });
  }

  static getJSONWithoutCredentials(url, success, error) {
    fetch(url, {
      method: 'get'
    })
      .then(resp => {
        return resp.json();
      })
      .then(returnedValue => {
        success(returnedValue);
      })
      .catch(function (ex) {
        if (error) {
          error(ex);
        }
      });
  }

  static postJSONWithCredentials(url, formData, success, error) {
    fetch(url, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formData
    })
      .then(resp => {
        return resp.json();
      })
      .then(returnedValue => {
        success(returnedValue);
      })
      .catch(function (ex) {
        if (error) {
          error(ex);
        }
      });
  }

  static postJSONWithoutCredentials(url, formData, success, error) {
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formData
    })
      .then(resp => {
        return resp.json();
      })
      .then(returnedValue => {
        success(returnedValue);
      })
      .catch(function (ex) {
        if (error) {
          error(ex);
        }
      });
  }

  static postFormDataWithCredentials(url, formData, success, error) {
    fetch(url, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
      .then(resp => {
        return resp.json();
      })
      .then(returnedValue => {
        success(returnedValue);
      })
      .catch(function (ex) {
        if (error) {
          error(ex);
        }
      });
  }

  static postFileWithCredentials(url, formData, success, error) {
    fetch(url, {
      method: 'post',
      credentials: 'include',
      body: formData
    })
      .then(resp => {
        return resp.json();
      })
      .then(returnedValue => {
        success(returnedValue);
      })
      .catch(function (ex) {
        if (error) {
          error(ex);
        }
      });
  }

  static postFormDataContainFileWithCredentials(url, formData, success, error) {
    fetch(url, {
      method: 'post',
      credentials: 'include',
      body: formData
    })
      .then(resp => {
        return resp.json();
      })
      .then(returnedValue => {
        success(returnedValue);
      })
      .catch(function (ex) {
        if (error) {
          error(ex);
        }
      });
  }

  static uploadFile(url, formData, success, error) {
    fetch(url, {
      method: 'post',
      credentials: 'include',
      body: formData
    })
      .then(resp => {
        return resp.json();
      })
      .then(returnedValue => {
        success(returnedValue);
      })
      .catch(function (ex) {
        if (error) {
          error(ex);
        }
      });
  }
}
