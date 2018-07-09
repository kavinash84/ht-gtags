export default function gaMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    if (__CLIENT__) {
      const { payload, type } = action;
      if (type === '@@router/LOCATION_CHANGE') {
        const location = payload.pathname;
        if (window && window.ga) {
          window.ga('set', 'page', location);
          window.ga('send', 'pageview');
        }
        if (window && window.ga) window.ga('send', 'pageview');
      }
    }
    return next(action);
  };
}
