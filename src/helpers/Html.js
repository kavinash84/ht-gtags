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
          <meta name="viewport" content="width=device-width, initial-scale=1 minimum-scale=1" />
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
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .embeddedServiceHelpButton .helpButton .uiButton {
                  background-color: #515151;
                  background: #515151!important;
                  font-family: "Salesforce Sans", sans-serif;
                  box-sizing: content-box;
                  font-weight: bold;
                  font-size: 16px;
                }
                .embeddedServiceHelpButton .helpButton .uiButton:focus {
                  outline: 1px solid #555555;
                }
                .embeddedServiceSidebarForm .backgroundImg, .embeddedServiceSidebarForm .backgroundImgColorMask {
                  height: 35px!important;
                }
                span#headerTextLabel {
                  color: #ffffff;
                }
                .embeddedServiceHelpButton .embeddedServiceIcon::before {
                  color: #FFF !important;
                }
                .embeddedServiceSidebarExtendedHeader {
                  margin: 0 12px !important;
                  border-radius: 0 0 6px 6px;
                }
                .message {
                  border-style: hidden;
                  border-width: 1px;
                  color: white;
                  padding: 6px 8px 6px 6px;
                  margin: 4px 20px;
                }
                @font-face {
                  font-family: 'Salesforce Sans';
                  src: url('https://www.sfdcstatic.com/system/shared/common/assets/fonts/SalesforceSans/SalesforceSans-Regular.woff') format('woff'),
                  url('https://www.sfdcstatic.com/system/shared/common/assets/fonts/SalesforceSans/SalesforceSans-Regular.ttf') format('truetype');
                }`
            }}
          />
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
          <script type="text/javascript" src="https://service.force.com/embeddedservice/5.0/esw.min.js" />
          <script
            type="text/javascript"
            src="https://c.la1-c1-hnd.salesforceliveagent.com/content/g/js/46.0/deployment.js"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                var emailId ='';
                var initESW = function(gslbBaseURL) {
                  embedded_svc.settings.displayHelpButton = true;
                  embedded_svc.settings.language = '';
                  embedded_svc.settings.defaultMinimizedText = 'Chat With Us';
                  //embedded_svc.settings.disabledMinimizedText = '...'; //(Defaults to Agent Offline)
                  //embedded_svc.settings.loadingText = 'Chat started'; //(Defaults to Loading)
                  //embedded_svc.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)
                  // Settings for Live Agent
                  //embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
                  // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
                  // Returns a valid button ID.
                  //};
                  embedded_svc.settings.prepopulatedPrechatFields = {
                    Email : emailId
                  };
                  //Sets the auto-population of pre-chat form fields
                  //embedded_svc.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
                  //embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)
                  embedded_svc.settings.extraPrechatInfo = [{
                    "entityFieldMaps": [{
                      "doCreate":false,
                      "doFind":true,
                      "fieldName":"PersonEmail",
                      "isExactMatch":true,
                      "label":"Email"
                    }],
                    "entityName": "Account",
                    "linkToEntityName": "Case",
                    "linkToEntityField": "AccountId"
                  },
                  {
                    "entityName": "Case",
                    "showOnCreate": true,
                    "saveToTranscript": "CaseId",
                    "entityFieldMaps": [{
                      "isExactMatch": false,
                      "fieldName": "Subject",
                      "doCreate": true,
                      "doFind": false,
                      "label": "CaseSubject"
                    },
                    {
                      "isExactMatch": false,
                      "fieldName": "Status",
                      "doCreate": true,
                      "doFind": false,
                      "label": "CaseStatus"
                    },
                    {
                      "isExactMatch": false,
                      "fieldName": "Origin",
                      "doCreate": true,
                      "doFind": false,
                      "label": "CaseOrigin"
                    }]
                  }];
                  embedded_svc.settings.extraPrechatFormDetails = [{
                    "label": "CaseSubject",
                    "value": "Live Chat",
                    "displayToAgent": true
                  }, {
                    "label": "CaseStatus",
                    "value": "Open",
                    "displayToAgent": false
                  }, {
                    "label": "CaseOrigin",
                    "value": "Chat",
                    "displayToAgent": true
                  }];
                  embedded_svc.settings.enabledFeatures = ['LiveAgent'];
                  embedded_svc.settings.entryFeature = 'LiveAgent';
                embedded_svc.init(
                  'https://praxisretail.my.salesforce.com',
                  'https://praxisretail.secure.force.com/LiveAgent',
                  gslbBaseURL,
                  '00D7F000006O16S',
                  'Chat_Deployment',
                  {
                    baseLiveAgentContentURL: 'https://c.la1-c1-hnd.salesforceliveagent.com/content',
                    deploymentId: '5727F0000009ARB',
                    buttonId: '5737F00000093Ue',
                    baseLiveAgentURL: 'https://d.la1-c1-hnd.salesforceliveagent.com/chat',
                    eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I7F0000004DjiUAE_16c51bfeb82',
                    isOfflineSupportEnabled: true
                  }
                );
              };
              if (!window.embedded_svc) {
                var s = document.createElement('script');
                s.setAttribute('src', 'https://praxisretail.my.salesforce.com/embeddedservice/5.0/esw.min.js');
                s.onload = function() {
                  initESW(null);
                };
                document.body.appendChild(s);
              } else {
                initESW('https://service.force.com');
              }`
            }}
            charSet="UTF-8"
          />
        </body>
      </html>
    );
    /* eslint-enable react/no-danger */
  }
}
