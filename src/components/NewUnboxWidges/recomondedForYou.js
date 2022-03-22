import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";

@connect(({ app: { sessionId } }) => ({
  session: sessionId
}))
export default class NewUnboxRecomondedForYou extends Component {
  componentDidMount() {
    if (window && window._unbxd_getRecommendations) {
      console.log(Cookies.get("unbxd.userId"), "UnboxUid");
      const { session, pageInfo } = this.props;
      window._unbxd_getRecommendations({
        widgets: {
          widget1: {
            name: "unbxd_recommended_for_you"
          }
        },
        userInfo: {
          userId: Cookies.get("unbxd.userId"),
          siteKey: window.UnbxdSiteName,
          apiKey: window.UnbxdApiKey
        },
        pageInfo: pageInfo,
        // {
        //     pageType: 'PRODUCT',
        //     productIds: ['uniqueId1', 'uniqueId2']
        // },
        dataParser: function(templateData) {
          return templateData;
        }
      });
    }
  }
  render() {
    return <div id="unbxd_recommended_for_you"> </div>;
  }
}
