import axios from 'axios';
import config from 'config';
import getCookie from '../utils/cookies';

export default function apiClient(req) {
  const instance = axios.create({
    baseURL: `https://${config.apiHost}`,
    rejectUnauthorized: false
  });

  let token;
  let csrfToken;
  let session;
  let customerKey;
  let customerValue;
  let loginKey;
  let loginValue;

  instance.setJwtToken = newToken => {
    token = newToken;
  };

  instance.setCSRFToken = csrf => {
    csrfToken = csrf;
  };

  instance.setSessionId = SessionId => {
    session = SessionId;
  };

  instance.setCustomerInfo = (key, value) => {
    customerKey = key;
    customerValue = value;
  };

  instance.setXId = (key, value) => {
    loginKey = key;
    loginValue = value;
  };

  instance.interceptors.request.use(
    conf => {
      if (__SERVER__) {
        if (req.header('cookie')) {
          const Auth = getCookie(req.header('cookie'), 'Authorization');
          if (Auth !== '') conf.headers.Authorization = Auth;
          conf.headers.Cookie = req.header('cookie');
        }
        if (req.header('authorization')) {
          conf.headers.authorization = req.header('Authorization');
        }
      }
      if (token) {
        conf.headers.Authorization = `Bearer ${token}`;
      }
      if (session) {
        conf.headers['X-SESSION-ID'] = session;
      }
      if (conf.method !== 'get' && csrfToken) {
        conf.headers['X-CSRF-Token'] = csrfToken;
      }
      /* for logged in user payments */
      if (customerKey && customerValue) {
        conf.headers['X-CUSTOMER-KEY'] = customerKey;
        conf.headers['X-CUSTOMER-VALUE'] = customerValue;
      }

      if (loginKey && loginValue) {
        conf.headers['X-ID-KEY'] = loginKey;
        conf.headers['X-ID-VALUE'] = loginValue;
      }

      return conf;
    },
    error => Promise.reject(error)
  );

  instance.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error.response ? error.response.data : error)
  );
  return instance;
}
