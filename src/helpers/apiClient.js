import axios from "axios";
import config from "config";
import getCookie from "../utils/cookies";

export default function apiClient(req) {
  const instance = axios.create({
    baseURL: `https://${config.apiHost}`,
    rejectUnauthorized: false
    // params: {
    //   devicePlatform: "desktop" // when ios app ready remove it & get the os from native code and pass here
    // }
  });

  let token;
  let csrfToken;
  let session;

  instance.setJwtToken = newToken => {
    token = newToken;
  };

  instance.setCSRFToken = csrf => {
    csrfToken = csrf;
  };

  instance.setSessionId = SessionId => {
    session = SessionId;
  };

  instance.interceptors.request.use(
    conf => {
      if (__SERVER__) {
        if (req.header("cookie")) {
          const Auth = getCookie(req.header("cookie"), "Authorization");
          if (Auth !== "") conf.headers.Authorization = Auth;
          conf.headers.Cookie = req.header("cookie");
        }
        if (req.header("authorization")) {
          conf.headers.authorization = req.header("Authorization");
        }
      }
      if (token) {
        conf.headers.Authorization = `Bearer ${token}`;
      }
      conf.headers["X-SESSION-ID"] = session;
      conf.headers["devicePlatform"] = "desktop";
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
