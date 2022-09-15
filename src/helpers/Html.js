import React, { Component } from "react";
import PropTypes from "prop-types";
import serialize from "serialize-javascript";
import Helmet from "react-helmet";
import config from "config";
import { newRelic, admitad, admitadSetCookie } from "utils/tracking";

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
    content: "",
    styleTags: []
  };

  render() {
    const { assets, store, content, bundles, styleTags } = this.props;
    let SF_CHAT = {
      url: "https://praxisretail.my.salesforce.com",
      liveAgentUrl: "https://praxisretail.secure.force.com/LiveAgent",
      version: "00D7F000006O16S",
      baseLiveAgentContentURL:
        "https://c.la2-c2-ukb.salesforceliveagent.com/content",
      deploymentId: "5727F0000009ARB",
      buttonId: "5732y000000PHDP",
      baseLiveAgentURL: "https://d.la2-c2-ukb.salesforceliveagent.com/chat",
      eswLiveAgentDevName:
        "EmbeddedServiceLiveAgent_Parent04I7F0000004DjiUAE_16c51bfeb82",
      jsUrl:
        "https://praxisretail.my.salesforce.com/embeddedservice/5.0/esw.min.js"
    };

    if (process.env.SF_ENV && process.env.SF_ENV !== "production") {
      SF_CHAT = {
        url: "https://praxisretail--produat.my.salesforce.com",
        liveAgentUrl: "https://produat-praxisretail.cs6.force.com/LiveAgent",
        version: "00DN0000000FXR7",
        baseLiveAgentContentURL:
          "https://c.la1-c1cs-hnd.salesforceliveagent.com/content",
        deploymentId: "5727F0000009ARB",
        buttonId: "573N000000000sa",
        baseLiveAgentURL: "https://d.la1-c1cs-hnd.salesforceliveagent.com/chat",
        eswLiveAgentDevName:
          "EmbeddedServiceLiveAgent_Parent04I7F0000004DjiUAE_16c51bfeb82",
        jsUrl:
          "https://praxisretail--produat.my.salesforce.com/embeddedservice/5.0/esw.min.js"
      };
    }
    let unbxdScripts = {};
    if (process.env.UNBXD && process.env.UNBXD === "production") {
      unbxdScripts = {
        autosuggestJs:
          "https://libraries.unbxdapi.com/prod-hometown808961566375586_autosuggest.js",
        autosuggestCss:
          "https://libraries.unbxdapi.com/prod-hometown808961566375586_autosuggest.css",
        searchJs:
          "https://libraries.unbxdapi.com/prod-hometown808961566375586_search.js",
        searchCss:
          "https://libraries.unbxdapi.com/prod-hometown808961566375586_search.css"
      };
    } else if (process.env.UNBXD && process.env.UNBXD === "beta") {
      unbxdScripts = {
        autosuggestJs:
          "https://sandbox.unbxd.io/dev-hometown808961566375617_autosuggest.js",
        autosuggestCss:
          "https://sandbox.unbxd.io/dev-hometown808961566375617_autosuggest.css",
        searchJs:
          "https://sandbox.unbxd.io/dev-hometown808961566375617_search.js",
        searchCss:
          "https://sandbox.unbxd.io/dev-hometown808961566375617_search.css"
      };
    } else {
      unbxdScripts = {
        autosuggestJs:
          "https://sandbox.unbxd.io/stage-hometown808961566375562_autosuggest.js",
        autosuggestCss:
          "https://sandbox.unbxd.io/stage-hometown808961566375562_autosuggest.css",
        searchJs:
          "https://sandbox.unbxd.io/stage-hometown808961566375562_search.js",
        searchCss:
          "https://sandbox.unbxd.io/stage-hometown808961566375562_search.css"
      };
    }
    const head = Helmet.renderStatic();
    /* eslint-disable */
    return (
      <html lang="en-IN">
        <head>
          <meta charSet="utf-8" />
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1 minimum-scale=1"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="HomeTown Web" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="HomeTown Web" />
          <meta name="theme-color" content="#3677dd" />
          <meta
            name="facebook-domain-verification"
            content="zcpr8ig8hh8z1idybyhitvi7j4nic4"
          />
          <link rel="manifest" href="/manifest.json" />
          {/* eslint-disable */}
          <link
            rel="preconnect"
            href="https://connect.facebook.net"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://bid.g.doubleclick.net"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://googleads.g.doubleclick.net"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://api.hometown.in"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://www.google-analytics.com"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://www.googleadservices.com"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://www.googletagmanager.com"
            crossOrigin=""
          />
          <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
          <link
            rel="preconnect"
            href="https://www.google.co.in"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://service.force.com"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://c.la1-c1-hnd.salesforceliveagent.com"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://d.la1-c1-hnd.salesforceliveagent.com"
            crossOrigin=""
          />
          <link rel="preconnect" href="https://bat.bing.com" crossOrigin="" />
          <link
            rel="preconnect"
            href="https://static.criteo.net"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="http://static.criteo.net"
            crossOrigin=""
          />
          <link rel="preconnect" href="http://m.hometown.in" crossOrigin="" />
          {/* eslint-disable */}
          {styleTags}
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {assets.styles &&
            Object.keys(assets.styles).map(style => (
              <link
                href={assets.styles[style]}
                key={style}
                media="screen"
                rel="stylesheet"
                type="text/css"
                // charSet="UTF-8"
              />
            ))}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? (
            <style
              dangerouslySetInnerHTML={{ __html: "#content{display:none}" }}
            />
          ) : null}
          {process.env.NODE_ENV !== "development" && (
            <script dangerouslySetInnerHTML={{ __html: newRelic }} />
          )}
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
                  margin: 0 18px !important;
                  border-radius: 0 0 8px 8px;
                }
                .message {
                  border-style: hidden;
                  border-width: 1px;
                  color: white;
                  padding: 6px 8px 6px 6px;
                  margin: 0px !important;
                }
                .embeddedServiceLiveAgentStateChatHeader:not(.alert) .message {
                  white-space: normal !important;
                }
                .embeddedServiceLiveAgentStateChatHeader .content {
                  height: 168px !important;
                }
                @font-face {
                  font-family: 'Salesforce Sans';
                  src: url('https://www.sfdcstatic.com/system/shared/common/assets/fonts/SalesforceSans/SalesforceSans-Regular.woff') format('woff'),
                  url('https://www.sfdcstatic.com/system/shared/common/assets/fonts/SalesforceSans/SalesforceSans-Regular.ttf') format('truetype');
                }
                #custom_snapins_invite {
                  background-color: #FFFFFF;
                  font-family: "Salesforce Sans", sans-serif;
                  overflow: visible;
                  border-radius: 8px;
                  /* visibility: visible; */
                  position: fixed;
                  bottom: 60px;
                  right: 15px;
                }

                .embeddedServiceInvitation {
                  background-color: transparent;
                  max-width: 290px;
                  max-height: 210px;
                  -webkit-box-shadow: 0 7px 12px rgba(0, 0, 0, 0.28);
                  -moz-box-shadow: 0 7px 12px rgba(0, 0, 0, 0.28);
                  box-shadow: 0 7px 12px rgba(0, 0, 0, 0.28);
                }

                @media only screen and (min-width: 48em) {

                  /*mobile*/
                  .embeddedServiceInvitation {
                    max-width: 332px;
                    max-height: 210px;
                  }
                }

                .embeddedServiceInvitation>.embeddedServiceInvitationHeader {
                  width: inherit;
                  height: 50px;
                  line-height: 32px;
                  padding: 10px;
                  color: #FFFFFF;
                  background-color: #515151;
                  overflow: initial;
                  display: flex;
                  justify-content: space-between;
                  align-items: stretch;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                }

                .embeddedServiceInvitationHeader #embeddedServiceAvatar {
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                }

                .embeddedServiceInvitationHeader .embeddedServiceTitleText {
                  font-size: 18px;
                  color: #FFFFFF;
                  overflow: hidden;
                  word-wrap: normal;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  align-self: stretch;
                  flex-grow: 1;
                  max-width: 100%;
                  margin: 0 12px;
                }

                .embeddedServiceInvitationHeader .embeddedServiceCloseIcon {
                  border: none;
                  border-radius: 3px;
                  cursor: pointer;
                  position: relative;
                  bottom: 3%;
                  background-color: transparent;
                  width: 32px;
                  height: 32px;
                  font-size: 23px;
                  color: #FFFFFF;
                }

                .embeddedServiceInvitationHeader .embeddedServiceCloseIcon:focus {
                  outline: none;
                }

                .embeddedServiceInvitationHeader .embeddedServiceCloseIcon:focus::before {
                  content: " ";
                  position: absolute;
                  top: 11%;
                  left: 7%;
                  width: 85%;
                  height: 85%;
                  background-color: rgba(255, 255, 255, 0.2);
                  border-radius: 4px;
                  pointer-events: visible;
                }

                .embeddedServiceInvitationHeader .embeddedServiceCloseIcon:active,
                .embeddedServiceCloseIcon:hover {
                  background-color: #FFFFFF;
                  color: rgba(0, 0, 0, 0.7);
                  opacity: 0.7;
                }

                .embeddedServiceInvitation>.embeddedServiceInvitationBody {
                  background-color: #FFFFFF;
                  max-height: 110px;
                  min-width: 260px;
                  margin: 0 8px;
                  font-size: 14px;
                  line-height: 20px;
                  overflow: auto;
                }

                .embeddedServiceInvitationBody p {
                  color: #333333;
                  padding: 8px;
                  margin: 12px 0;
                }

                .embeddedServiceInvitation>.embeddedServiceInvitationFooter {
                  width: inherit;
                  color: #FFFFFF;
                  text-align: right;
                  background-color: #FFFFFF;
                  // padding: 10px;
                  max-height: 50px;
                  border-bottom-left-radius: 8px;
                  border-bottom-right-radius: 8px;
                }

                .embeddedServiceInvitationFooter>.embeddedServiceActionButton {
                  font-size: 14px;
                  max-height: 40px;
                  border: none;
                  border-radius: 4px;
                  padding: 10px;
                  margin: 4px;
                  text-align: center;
                  text-decoration: none;
                  display: inline-block;
                  cursor: pointer;
                  background-color: #515151;
                  color: #ffffff;
                }

                .embeddedServiceInvitationFooter>#acceptInvite {
                  background-color: #333333;
                  color: #FFFFFF;
                }

                .embeddedServiceInvitationFooter>#rejectInvite {
                  background-color: #FFFFFF;
                  color: #333333;
                }
                `
            }}
          />
          <script src={admitad.src} async onError={admitad.onerror}></script>
          {/* <script type="text/javascript">
            {`	// name of the cookie that stores the source
	// change if you have another name
	var cookie_name = 'deduplication_cookie';
	// cookie lifetime
	var days_to_store = 90;
	// expected deduplication_cookie value for Admitad
	var deduplication_cookie_value = 'admitad';
	// name of GET parameter for deduplication
	// change if you have another name
	var channel_name = 'utm_source';
	// a function to get the source from the GET parameter
	getSourceParamFromUri = function () {
		var pattern = channel_name + '=([^&]+)';
		var re = new RegExp(pattern);
		return (re.exec(document.location.search) || [])[1] || '';
	};
	// a function to get the source from the cookie named cookie_name
	getSourceCookie = function () {
		var matches = document.cookie.match(new RegExp(
			'(?:^|; )' + cookie_name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	};
	// a function to set the source in the cookie named cookie_name
	setSourceCookie = function () {
		var param = getSourceParamFromUri();
		if (!param) { return; }
		var period = days_to_store * 60 * 60 * 24 * 1000;	// in seconds
		var expiresDate = new Date((period) + +new Date);
		var cookieString = cookie_name + '=' + param + '; path=/; expires=' + expiresDate.toGMTString();
		document.cookie = cookieString;
		document.cookie = cookieString + '; domain=.' + location.host;
	};
	// set cookie
	setSourceCookie();`}
          </script> */}
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
          <link
            rel="stylesheet"
            type="text/css"
            href={unbxdScripts.autosuggestCss}
          />
          <script src={unbxdScripts.searchJs} />
          <link
            rel="stylesheet"
            type="text/css"
            href={unbxdScripts.searchCss}
          />
          <script
            type="text/javascript"
            async=""
            src="https://d21gpk1vhmjuf5.cloudfront.net/embed.js"
          />
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
          {__DLLS__ && (
            <script
              key="dlls__vendor"
              src="/dist/dlls/dll__vendor.js"
              charSet="UTF-8"
            />
          )}
          {assets.javascript && (
            <script src={assets.javascript.main} charSet="UTF-8" />
          )}
          {bundles.map(
            bundle =>
              bundle && (
                <script src={config.assetsPath + bundle.file} key={bundle.id} />
              )
          )}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? (
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'document.getElementById("content").style.display="block";'
              }}
            />
          ) : null}
          <script
            type="text/javascript"
            src="https://service.force.com/embeddedservice/5.0/esw.min.js"
          />
          <script
            type="text/javascript"
            src="https://c.la1-c1-hnd.salesforceliveagent.com/content/g/js/47.0/deployment.js"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
               liveagent.init('${SF_CHAT.baseLiveAgentURL}', '${SF_CHAT.deploymentId}', '${SF_CHAT.version}');
             `
            }}
            charSet="UTF-8"
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
                  '${SF_CHAT.url}',
                  '${SF_CHAT.liveAgentUrl}',
                  gslbBaseURL,
                   '${SF_CHAT.version}',
                  'Chat_Deployment',
                  {
                    baseLiveAgentContentURL: '${SF_CHAT.baseLiveAgentContentURL}',
                    deploymentId: '${SF_CHAT.deploymentId}',
                    buttonId: '${SF_CHAT.buttonId}',
                    baseLiveAgentURL: '${SF_CHAT.baseLiveAgentURL}',
                    eswLiveAgentDevName: '${SF_CHAT.eswLiveAgentDevName}',
                    isOfflineSupportEnabled: true
                  }
                );
              };
              if (!window.embedded_svc) {
                var s = document.createElement('script');
               s.setAttribute('src', '${SF_CHAT.jsUrl}');
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
          <script dangerouslySetInnerHTML={{ __html: admitadSetCookie }} />
        </body>
      </html>
    );
    /* eslint-enable react/no-danger */
  }
}
