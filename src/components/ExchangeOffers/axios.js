import axios from "axios";
import config from "config";

// const gitHubInstance = axios.create({
//   baseURL: 'https://p-rk.github.io/hometown/',
//   timeout: 5000
// });

// const getDevicePlatform = () => {
//   let path = '';
//   const windowGlobal = typeof window !== 'undefined' && window ? window : '';
//   if (windowGlobal) {
//     path = windowGlobal.location.hostname;
//   }
//   const mobileSites = ['stage-m.hometown.in', 'beta-m.hometown.in', 'm.hometown.in'];
//   const desktopSites = ['stage.hometown.in', 'beta.hometown.in', 'hometown.in'];
//   const appSites = ['pwa.hometown.in', 'stage-pwa.hometown.in'];
//   let platform = '';
//   if (mobileSites.indexOf(path) > -1) {
//     platform = 'msite';
//   } else if (desktopSites.indexOf(path) > -1) {
//     platform = 'desktop';
//   } else if (appSites.indexOf(path) > -1) {
//     platform = 'android';
//   } else {
//     platform = 'NA';
//   }
//   return platform;
// };
const apiInstance = axios.create({
  baseURL: `https://${config.apiHost}`,
  headers: {
    "X-SESSION-ID": "hometown"
  },
  timeout: 5000
});
const apiInstanceTest = axios.create({
  baseURL: `https://${config.apiHost}`,
  headers: {
    "X-SESSION-ID": "hometown",
    "Content-Type": "multipart/form-data"
  },
  timeout: 15000
});

export default { apiInstance, apiInstanceTest };
