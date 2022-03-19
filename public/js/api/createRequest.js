/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest,
     formData = new FormData;


  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE && xhr.status == 200) {
      options.callback(xhr.response.error, xhr.response);
    }
  });

  if (options.method == 'POST') {
    if (options.data !== undefined) {
      Object.keys(options.data).forEach(key => {
        formData.append(key, options.data[key]);
      });
      xhr.responseType = options.responseType;
      xhr.open(options.method, options.url);
      xhr.send(formData);
    } else {
      xhr.open(options.method, options.url);
      xhr.send();
    }
  }

  if (options.method == 'GET') {
    xhr.open(options.method, options.url);
    xhr.send();
  }

  if (options.method == 'PUT') {
    if (options.data !== undefined) {
      Object.keys(options.data).forEach(key => {
        formData.append(key, options.data[key]);
      });
      xhr.responseType = options.responseType;
      xhr.open(options.method, options.url);
      xhr.send(formData);
    }
  }
  if (options.method == 'DELETE') {
    if (options.data !== undefined) {
      Object.keys(options.data).forEach(key => {
        formData.append(key, options.data[key]);
      });
      xhr.responseType = options.responseType;
      xhr.open(options.method, options.url);
      xhr.send(formData);
    }
  }
};