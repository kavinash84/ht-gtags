import React, { Component } from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import config from 'config';
import { newRelic, admitad, admitadSetCookie } from 'utils/tracking';

const ONESIGNALID = 'b2f22db2-b562-4530-8888-516550bfbe6d';
// const { version } = require('../../package.json');

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
    // let SF_CHAT = {
    //   url: 'https://praxisretail.my.salesforce.com',
    //   liveAgentUrl: 'https://praxisretail.secure.force.com/LiveAgent',
    //   version: '00D7F000006O16S',
    //   baseLiveAgentContentURL: 'https://c.la2-c2-hnd.salesforceliveagent.com/content',
    //   deploymentId: '5727F0000009ARB',
    //   buttonId: '5732y000000PHDP',
    //   baseLiveAgentURL: 'https://d.la2-c2-hnd.salesforceliveagent.com/chat',
    //   eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I7F0000004DjiUAE_16c51bfeb82',
    //   jsUrl: 'https://praxisretail.my.salesforce.com/embeddedservice/5.0/esw.min.js'
    // };

    // if (process.env.SF_ENV && process.env.SF_ENV !== 'production') {
    //   SF_CHAT = {
    //     url: 'https://praxisretail--produat.my.salesforce.com',
    //     liveAgentUrl: 'https://produat-praxisretail.cs6.force.com/LiveAgent',
    //     version: '00DN0000000FXR7',
    //     baseLiveAgentContentURL: 'https://c.la1-c1cs-ukb.salesforceliveagent.com/content',
    //     deploymentId: '5727F0000009ARB',
    //     buttonId: '573N000000000sa',
    //     baseLiveAgentURL: 'https://d.la1-c1cs-ukb.salesforceliveagent.com/chat',
    //     eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I7F0000004DjiUAE_16c51bfeb82',
    //     jsUrl: 'https://praxisretail--produat.my.salesforce.com/embeddedservice/5.0/esw.min.js'
    //   };
    // }
    let unbxdScripts = {};
    if (process.env.UNBXD && process.env.UNBXD === 'production') {
      unbxdScripts = {
        autosuggestJs: 'https://libraries.unbxdapi.com/prod-hometown808961566375586_autosuggest.js',
        autosuggestCss: 'https://libraries.unbxdapi.com/prod-hometown808961566375586_autosuggest.css',
        searchJs: 'https://libraries.unbxdapi.com/prod-hometown808961566375586_search.js',
        searchCss: 'https://libraries.unbxdapi.com/prod-hometown808961566375586_search.css'
      };
    } else if (process.env.UNBXD && process.env.UNBXD === 'beta') {
      unbxdScripts = {
        autosuggestJs: 'https://sandbox.unbxd.io/dev-hometown808961566375617_autosuggest.js',
        autosuggestCss: 'https://sandbox.unbxd.io/dev-hometown808961566375617_autosuggest.css',
        searchJs: 'https://sandbox.unbxd.io/dev-hometown808961566375617_search.js',
        searchCss: 'https://sandbox.unbxd.io/dev-hometown808961566375617_search.css'
      };
    } else {
      unbxdScripts = {
        autosuggestJs: 'https://sandbox.unbxd.io/stage-hometown808961566375562_autosuggest.js',
        autosuggestCss: 'https://sandbox.unbxd.io/stage-hometown808961566375562_autosuggest.css',
        searchJs: 'https://sandbox.unbxd.io/stage-hometown808961566375562_search.js',
        searchCss: 'https://sandbox.unbxd.io/stage-hometown808961566375562_search.css'
      };
    }
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
          <meta name="viewport" content="width=device-width, initial-scale=1 minimum-scale=1" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="HomeTown Web" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="HomeTown Web" />
          <meta name="theme-color" content="#3677dd" />
          <meta name="facebook-domain-verification" content="zcpr8ig8hh8z1idybyhitvi7j4nic4" />
          <link rel="manifest" href="/manifest.json" />
          {/* eslint-disable */}
          <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="" />
          <link rel="preconnect" href="https://bid.g.doubleclick.net" crossOrigin="" />
          <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="" />
          <link rel="preconnect" href="https://api.hometown.in" crossOrigin="" />
          <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />
          <link rel="preconnect" href="https://www.googleadservices.com" crossOrigin="" />
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
          <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
          <link rel="preconnect" href="https://www.google.co.in" crossOrigin="" />
          <link rel="preconnect" href="https://cdn.onesignal.com" crossOrigin="" />
          <link rel="preconnect" href="https://onesignal.com" crossOrigin="" />
          <link rel="preconnect" href="https://service.force.com" crossOrigin="" />
          <link rel="preconnect" href="https://c.la1-c1-hnd.salesforceliveagent.com" crossOrigin="" />
          <link rel="preconnect" href="https://d.la1-c1-hnd.salesforceliveagent.com" crossOrigin="" />
          <link rel="preconnect" href="https://bat.bing.com" crossOrigin="" />
          <link rel="preconnect" href="https://static.criteo.net" crossOrigin="" />
          <link rel="preconnect" href="http://static.criteo.net" crossOrigin="" />
          <link rel="preconnect" href="http://m.hometown.in" crossOrigin="" />
          {/* eslint-disable */}
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
          {/* {process.env.NODE_ENV !== 'development' && (
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-T5VV7MZ"
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="gaTag"
              />
            </noscript>
          )} */}
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script src={unbxdScripts.autosuggestJs} async="" />
          <link rel="stylesheet" type="text/css" href={unbxdScripts.autosuggestCss} />
          <script src={unbxdScripts.searchJs} />
          <link rel="stylesheet" type="text/css" href={unbxdScripts.searchCss} />
          <script type="text/javascript" async="" src="https://d21gpk1vhmjuf5.cloudfront.net/embed.js" />
          <script
            type="text/javascript"
            async=""
            src="https://d21gpk1vhmjuf5.cloudfront.net/unbxdAnalytics.js"
          ></script>
          {store && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__data=${serialize(store.getState())};`
              }}
              charSet="UTF-8"
            />
          )}
          {__DLLS__ && <script key="dlls__vendor" src="/dist/dlls/dll__vendor.js" charSet="UTF-8" />}
          {assets.javascript && <script src={assets.javascript.main} charSet="UTF-8" />}
          {bundles.map(bundle => bundle && <script src={config.assetsPath + bundle.file} key={bundle.id} />)}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? (
            <script
              dangerouslySetInnerHTML={{
                __html: 'document.getElementById("content").style.display="block";'
              }}
            />
          ) : null}
          <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async="" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                var OneSignal = window.OneSignal || [];
                OneSignal.push(function() {
                  OneSignal.init({
                    appId: '${ONESIGNALID}',
                  });
                })
              `
            }}
            charSet="UTF-8"
          />
          <script src={admitad.src} async onError={admitad.onerror}></script>
          <script dangerouslySetInnerHTML={{ __html: admitadSetCookie }} />
        </body>
      </html>
    );
    /* eslint-enable react/no-danger */
  }
}
