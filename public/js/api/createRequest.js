/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest,
    formData = new FormData;

  Object.keys(options.data).forEach(key => {
    formData.append(key, options.data[key]);
  });

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE && xhr.status == 200) {
      options.callback(xhr.response.error, xhr.response);
    }
  });

  options.callback();

  xhr.responseType = options.responseType;
  xhr.open(options.method, options.url);
  xhr.send(formData);
};