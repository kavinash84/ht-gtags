export default function gaMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    if (__CLIENT__) {
      const { payload, type } = action;
      if (type === '@@router/LOCATION_CHANGE') {
        const location = payload.pathname;
        if (window && window.dataLayer) {
          window.dataLayer.push({
            event: 'pageviewtrack',
            vpv: location
          });
        }
        if (window && window.ga) window.ga('send', 'pageview');
      }
    }
    return next(action);
  };
}
