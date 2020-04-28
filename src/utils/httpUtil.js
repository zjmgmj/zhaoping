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

export const uploadImage = (url, file, success, failure) => {
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

export const uploadFilePost = ({
  url = 'upload/fileupload',
  file,
  success,
  failure,
}) => {
  console.log('file', file);
  let formData = new FormData();
  const fileData = {
    uri: file.uri,
    type: 'multipart/form-data;charset=utf-8',
    fileType: file.type,
    name: encodeURIComponent(file.fileName),
    // size: 100,
  };
  formData.append('file', fileData);
  // formData.append('file', {uri: `file://${path}`, type: 'multipart/form-data'});
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

export const httpGetPromise = (api, parameter = {}) => {
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
  return new Promise(resolve => {
    // setTimeout(() => {
    //   resolve(dataModal)
    // }, 2000)

    //发起请求
    fetch(url, opt)
      .then(data => {
        return data.json();
      })
      .then(response => {
        if (response) {
          console.log(response);
          resolve(response);
        }
      })
      .catch(error => {
        if (error) {
          console.log(error);
          // failure(error);
        }
      });
  }).catch(e => {
    console.log(e);
  });
};
