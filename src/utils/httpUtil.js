import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
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
  // console.log('httpGet', url);
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
export const httpPost = (url, parameter, success, failure = () => {}) => {
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

export const uploadImage = (url, file, success, failure = () => {}) => {
  let formData = new FormData();
  console.log('file', JSON.stringify(file));
  let fileData = {
    uri: file.uri,
    type: file.type,
    name: file.fileName,
    size: file.fileSize,
  };
  if (file.mediaType === 'video') {
    const videoPath = file.path.split('/');
    const videoType = file.path.split('.');
    let PATH =
      Platform.OS == 'ios' ? file.uri.replace('file:///', '') : file.uri;
    const videoData = {
      name: 'video',
      filename: videoPath[videoPath.length - 1],
      // data: RNFetchBlob.wrap(file.uri),
      size: 100,
      uri: file.uri,
      type: `video/${videoType[videoType.length - 1]}`,
      // type: `video/${videoType[videoType.length - 1]}`,
      // name: 'file',
      // filename: videoPath[videoPath.length - 1],
      // data: RNFetchBlob.wrap(PATH),
    };
    // console.log('videoData', JSON.stringify(videoData));
    fileData = videoData;
  }

  formData.append('file', fileData);
  formData.append('model', file.mediaType);
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

export const uploadVideo = (file, cb = () => {}) => {
  const url = 'upload/fileupload';
  const videoPath = file.path.split('/');
  const videoType = file.path.split('.');
  let PATH = Platform.OS == 'ios' ? file.uri.replace('file:///', '') : file.uri;
  // let PATH = Platform.OS == 'ios' ? file.uri.replace('file:///', '') : file.uri;
  const params = {
    // type: `video/${videoType[videoType.length - 1]}`,
    // name: 'file',
    // filename: videoPath[videoPath.length - 1],
    type: 'video/mp4',
    name: 'file',
    filename: 'vid.mp4',
    // data: RNFetchBlob.wrap(PATH),
    data: RNFetchBlob.wrap(RNFetchBlob.fs.asset(file.path)),
  };
  console.log('paramsVideo', params);
  RNFetchBlob.fetch(
    'POST',
    'http://114.55.169.95/yun_rest/upload/fileupload',
    {
      Authorization: 'Bearer access-token',
      otherHeader: 'foo',
      'Content-Type': 'multipart/form-data',
    },
    [params],
  )
    .then(data => {
      console.log('data-------------', data);
      return data.json();
    })
    .then(res => {
      console.log('video-------------', res);
      cb(res);
    })
    .catch(err => {
      console.log('uploadVideoErr', err);
    });
};

export const httpGetLocation = (
  api,
  // parameter = {},
  success,
  failure = () => {},
) => {
  //封装请求配置： 请求方法、请求头、请求体
  // const params = [];
  // Object.keys(parameter).forEach(key => {
  //   params.push(`${key}=${parameter[key]}`);
  // });
  // const paramStr = params.toString().replace(/,/g, '&');
  // let url = api;
  // if (paramStr) {
  //   url = url + '?' + paramStr;
  // }

  let opt = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  console.log('httpGet', api);
  //发起请求
  fetch(api, opt)
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

export const uploadFilePost = ({
  url = 'upload/fileupload',
  file,
  success,
  failure = () => {},
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
