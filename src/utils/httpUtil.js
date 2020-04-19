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
  //发起请求
  fetch(baseUrl + url, opt)
    .then(data => {
      console.log('data', data);
      return data.json();
    })
    .then(response => {
      console.log('response', response);
      success(response);
    })
    .catch(error => {
      console.log('error', error);
      failure(error);
    });
};

export const uploadFile = (url, file, success, failure) => {
  let formData = new FormData();
  const fileData = {
    uri: file.uri,
    type: file.type,
    name: file.fileName,
    size: file.fileSize,
  };
  formData.append('file', fileData);
  fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
    .then(data => {
      console.log('data', data);
      return data.json();
    })
    .then(res => {
      console.log('uploadFile', res);
      success(res);
    })
    .then(err => {
      console.log('err', err);
      failure(err);
    });
};
