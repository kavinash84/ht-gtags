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
      var beforeTemplateRenderer = function(templateData) {
        var modifyTemplateData = function(data) {
          if (!data || !data.recommendations) {
            return;
          }

          var getSliderWidth = function() {
            if (
              jQuery("#unbxd_recommended_for_you") &&
              jQuery("#unbxd_recommended_for_you").length
            ) {
              return jQuery("#unbxd_recommended_for_you").width();
            } else if (
              jQuery("#unbxd_recently_viewed") &&
              jQuery("#unbxd_recently_viewed").length
            ) {
              return jQuery("#unbxd_recently_viewed").width();
            } else if (
              jQuery("#unbxd_best_sellers") &&
              jQuery("#unbxd_best_sellers").length
            ) {
              return jQuery("#unbxd_best_sellers").width();
            }
          };

          var sliderWidth = getSliderWidth();
          var sliderOffset = 10;
          var productTileGap = 50;
          var slidesToShow = 4;
          var recsBoxSize =
            sliderWidth / slidesToShow - sliderOffset - productTileGap;

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
      // if (window.UnbxdSiteName) {
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
      // }
    }
  }
  render() {
    return <div id="unbxd_best_sellers"> </div>;
  }
}
