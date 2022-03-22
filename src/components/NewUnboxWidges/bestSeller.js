import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";

@connect(({ app: { sessionId } }) => ({
  session: sessionId
}))
export default class NewUnboxBestSeller extends Component {
  componentDidMount() {
    if (window && window._unbxd_getRecommendations) {
      const { session, pageInfo } = this.props;
      window._unbxd_getRecommendations({
        widgets: {
          widget1: {
            name: "unbxd_best_sellers"
          }
        },
        userInfo: {
          userId: Cookies.get("unbxd.userId"),
          siteKey: window.UnbxdSiteName,
          apiKey: window.UnbxdApiKey
        },
        pageInfo: pageInfo,
        // pageInfo: {
        //   pageType: "CATEGORY",
        //   catlevel1Name: "furniture",
        //   catlevel2Name: "living-room-furniture",
        //   catlevel3Name: "sofas",
        //   catlevel4Name: "new sofas"
        // },
        dataParser: function(templateData) {
          return templateData;
        }
      });
    }
  }
  render() {
    return <div id="unbxd_best_sellers"> </div>;
  }
}
