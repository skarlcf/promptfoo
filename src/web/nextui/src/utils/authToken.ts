import Cookies from 'js-cookie';

export function getAuthToken() {
  return Cookies.get('auth_token');
}

export function setAuthToken(token: string) {
  Cookies.set('auth_token', token);
}

export function removeAuthToken() {
  Cookies.remove('auth_token');
}
