const baseUrl = 'http://114.55.169.95/yun_rest/';
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
  console.log('httpGet', url);
  //发起请求
  fetch(url, opt)
    .then(data => {
      return data.json();
    })
    .then(response => {
      if (response) {
        console.log(response);
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
  console.log('api', baseUrl + url);
  console.log('body', opt);
  //发起请求
  fetch(baseUrl + url, opt)
    .then(data => {
      return data.json();
    })
    .then(response => {
      console.log(response);
      success(response);
    })
    .catch(error => {
      failure(error);
    });
};
