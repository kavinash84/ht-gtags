import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";

@connect(({ app: { sessionId } }) => ({
  session: sessionId
}))
export default class NewUnboxRecentlyViewed extends Component {
  componentDidMount() {
    if (window && window._unbxd_getRecommendations) {
      const { session, pageInfo } = this.props;
      window._unbxd_getRecommendations({
        widgets: {
          widget1: {
            name: "unbxd_recently_viewed"
          }
        },
        userInfo: {
          userId: Cookies.get("unbxd.userId"),
          siteKey: window.UnbxdSiteName,
          apiKey: window.UnbxdApiKey
        },
        pageInfo: pageInfo,
        dataParser: function(templateData) {
          return templateData;
        }
      });
    }
  }
  render() {
    return <div id="unbxd_recently_viewed"> </div>;
  }
}
