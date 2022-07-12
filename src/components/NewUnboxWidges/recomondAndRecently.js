import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";

@connect(({ app: { sessionId } }) => ({
  session: sessionId
}))
export default class NewUnboxRecomondRecentlyViewed extends Component {
  componentDidMount() {
    if (window && window._unbxd_getRecommendations) {
      const { session, pageInfo } = this.props;
      var beforeTemplateRenderer = function(templateData) {
        var modifyTemplateData = function(data) {
          if (!data || !data.recommendations) {
            return;
          }

          var sliderWidth = jQuery(". unbxd-recs-container").width();
          var sliderOffset = 10;
          var productTileGap = 50;

          var recsBoxSize = sliderWidth / 4 - sliderOffset - productTileGap;

          var getImageSuffix = function() {
            var imageSuffix =
              ".jpg?" +
              "width=" +
              recsBoxSize +
              "&height=" +
              recsBoxSize +
              "&mode=fill";
            return imageSuffix;
          };

          var updatedRecsData = data.recommendations.map(function(product) {
            var imageURL = product.imageURL + getImageSuffix();
            var recsBoxWidth = recsBoxSize + "px";
            var recsBoxHeight = recsBoxSize + "px";

            return { ...product, imageURL, recsBoxWidth, recsBoxHeight };
          });

          return { ...data, recommendations: updatedRecsData };
        };

        templateData = modifyTemplateData(templateData);

        return templateData;
      };

      window._unbxd_registerHook(
        "beforeTemplateRender",
        beforeTemplateRenderer
      );

      window._unbxd_getRecommendations({
        widgets: {
          widget1: { name: "unbxd_recommended_for_you" },
          widget2: { name: "unbxd_recently_viewed" }
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
    return (
      <React.Fragment>
        <div id="unbxd_recommended_for_you" className="unbxd-recs-container">
          {" "}
        </div>
        <div id="unbxd_recently_viewed" className="unbxd-recs-container">
          {" "}
        </div>
      </React.Fragment>
    );
  }
}
