const baseUrl = 'http://114.55.169.95/yunpin_rest/';
export const httpGet = (api, parameter = {}, success, failure = () => {}) => {
  //封装请求配置： 请求方法、请求头、请求体
  const params = [];
  Object.keys(parameter).forEach(key => {
    params.push(`${key}=${parameter[key]}`);
  });
  const paramStr = params.toString().replace(/,/g, '&');
  let url = baseUrl + api;
  if (paramStr) {
    url = url + '?' + paramStr;
  }

  let opt = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  //发起请求
  fetch(url, opt)
    .then(data => {
      return data.json();
    })
    .then(response => {
      if (response) {
        success(response);
      }
    })
    .catch(error => {
      if (error) {
        failure(error);
      }
    });
};
export const httpPost = (url, parameter, success, failure) => {
  //封装请求配置： 请求方法、请求头、请求体
  let opt = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parameter),
  };
  //发起请求
  fetch(baseUrl + url, opt)
    .then(data => {
      return data.json();
    })
    .then(response => {
      success(response);
    })
    .catch(error => {
      failure(error);
    });
};
