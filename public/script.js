const sendPostReq = function (url, body, callback) {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'},
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((res) => callback(res));
};

const isValidLogin = function ({isUserExists}) {
  if (isUserExists) {
    return (document.location = '/home.html');
  }
  document.querySelector('#loginMsg').style['visibility'] = 'visible';
};

const validateLogin = function () {
  const name = document.querySelector('#name').value;
  const password = document.querySelector('#password').value;
  sendPostReq('/validateLogin', {name, password}, isValidLogin);
};

const logOut = function () {
  sendPostReq('/logOut', {}, ({status}) => status && location.replace('/'));
};
