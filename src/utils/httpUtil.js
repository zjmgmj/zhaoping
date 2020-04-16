const baseUrl = 'http://114.55.169.95/yunpin_rest/';
export const httpGet = (api, parameter = {}, success, failure) => {
  //封装请求配置： 请求方法、请求头、请求体
  debugger;
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
    .then(data => data.text())
    .then(response => {
      if (response) {
        success(JSON.parse(response));
      }
    })
    .catch(error => {
      if (error) {
        failure(JSON.parse(error));
      }
    });
};
export const httPost = (url, parameter, success, failure) => {
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
    .then(data => data.text())
    .then(response => {
      debugger;
      console.log('response', response);
      success(JSON.parse(response));
    })
    .catch(error => {
      failure(JSON.parse(error));
    });
};
