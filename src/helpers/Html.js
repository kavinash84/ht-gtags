import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import config from 'config';
import { newRelic } from 'utils/tracking';

const { version } = require('../../package.json');

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.shape({
      styles: PropTypes.object,
      javascript: PropTypes.object
    }),
    bundles: PropTypes.arrayOf(PropTypes.any),
    content: PropTypes.string,
    store: PropTypes.shape({
      getState: PropTypes.func
    }).isRequired,
    styleTags: PropTypes.array
  };

  static defaultProps = {
    assets: {},
    bundles: [],
    content: '',
    styleTags: []
  };
  render() {
    const {
      assets, store, content, bundles, styleTags
    } = this.props;
    const head = Helmet.renderStatic();
    /* eslint-disable */
    return (
      <html lang="en-US">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="HomeTown Web" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="HomeTown Web" />
          <meta name="theme-color" content="#3677dd" />
          <link rel="manifest" href="/manifest.json" />
          {styleTags}
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {assets.styles &&
            Object.keys(assets.styles).map(style => (
              <link
                href={assets.styles[style]}
                key={style}
                media="screen, projection"
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
              />
            ))}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? (
            <style dangerouslySetInnerHTML={{ __html: '#content{display:none}' }} />
          ) : null}
          {process.env.NODE_ENV !== 'development' && <script dangerouslySetInnerHTML={{ __html: newRelic }} />}
        </head>
        <body>
          {process.env.NODE_ENV !== 'development' && (
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-T5VV7MZ"
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="gaTag"
              />
            </noscript>
          )}
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          {store && (
            <script
              dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
              charSet="UTF-8"
            />
          )}
          {__DLLS__ && <script key="dlls__vendor" src="/dist/dlls/dll__vendor.js" charSet="UTF-8" />}
          {assets.javascript && <script src={assets.javascript.main} charSet="UTF-8" />}
          {bundles.map(bundle => bundle && <script src={config.assetsPath + bundle.file} key={bundle.id} />)}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? (
            <script dangerouslySetInnerHTML={{ __html: 'document.getElementById("content").style.display="block";' }} />
          ) : null}
          <script
            type="text/javascript"
            src="https://c.la1-c2cs-hnd.salesforceliveagent.com/content/g/js/45.0/deployment.js"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            if (!window._laq) { window._laq = []; }
            window._laq.push(function(){
              liveagent.showWhenOnline('573N000000000Ub', document.getElementById('liveagent_button_online_573N000000000Ub'));
              liveagent.showWhenOffline('573N000000000Ub', document.getElementById('liveagent_button_offline_573N000000000Ub'));
            });
            var emailId ='';
            //Example : liveagent.addCustomDetail('Contact_ID', test@gmail.com); 
            liveagent.addCustomDetail('Contact_ID', emailId); 
            liveagent.init('https://d.la1-c2cs-hnd.salesforceliveagent.com/chat', '572N000000000PC', '00DN0000000Qxcj');
          `
            }}
          />
          <Helmet>
            {process.env.NODE_ENV !== 'development' ? (
              <Fragment>
                <script src="https://cdn.ravenjs.com/3.24.0/raven.min.js" crossOrigin="anonymous" />
                <script>
                  {`
                  Raven.config('https://e072a281afc44732a8976d0615f0e310@sentry.io/1254610', {
                  release: '${version.replace(/\./g, '-')}',
                  environment: 'production',
                  }).install()
                `}
                </script>
              </Fragment>
            ) : null}
          </Helmet>
        </body>
      </html>
    );
    /* eslint-enable react/no-danger */
  }
}
