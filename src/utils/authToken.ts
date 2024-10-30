import Cookies from 'js-cookie';

function getAuthToken() {
  return Cookies.get('token');
}

function setAuthToken(token: string) {
  Cookies.set('token', token, { expires: 1 });
}

function deleteAuthToken() {
  Cookies.remove('token');
}

export { getAuthToken, setAuthToken, deleteAuthToken };
