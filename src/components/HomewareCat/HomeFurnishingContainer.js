import React from "react";
import PropTypes from "prop-types";
import Row from "hometown-components-dev/lib/Row";
import Div from "hometown-components-dev/lib/Div";
import Section from "hometown-components-dev/lib/Section";
import { connect } from "react-redux";
import NewUnboxBestSeller from "components/NewUnboxWidges/bestSeller";
import MainFurnitureSlider from "../FurnitureCategories/MainFurnitureSlider";
import ShopByCategory from "./ShopByCategory/ShopByCategory";

import ShopByCollection from "./ShopByCollection";
// import CommonLayout from "./CommonLayout/CommonLayout";

// import ShopOurNewArrivals from "./ShopOurNewArrivals";
import BestBuy from "./BestBuy/BestBuy";
// import LetUsHelpYou from "./LetUsHelp";
// import ShopMattress from "./ShopMattress";
import BannerImage from "./BannerImage";
// import Outdoor from "./Outdoor";
import BestSeller from "./BestSeller";
import RecommendForYou from "./RecommendForYou/RecommendForYou";

import ShopByBrand from "./ShopByBrand/ShopByBrand";
@connect(({ homepage: { menu }, category, category: { data } }) => ({
  menu: menu.data,
  category: data && data.items && data.items.text,
  seoInfo: data && data.seo && data.seo.items
}))
class HomeFurnishingContainer extends React.Component {
  render() {
    const { category } = this.props;
    return (
      <Section p="0" mb="0">
        <div className="wrapper">
          {category && (
            <MainFurnitureSlider
              data={category.main}
              mb="0"
              style={{ width: "100%" }}
            />
          )}

          {category &&
            category.sections &&
            category.sections.map((cat, index) => (
              <div key={String(index)} style={{ width: "100%" }}>
                {cat.component === 1 ? (
                  <ShopByCategory title={cat.title} data={cat.data} />
                ) : (
                  ""
                )}
                {cat.component === 2 ? (
                  <BannerImage
                    alt={cat.title}
                    src={cat.image}
                    url_key={cat.url_key}
                  />
                ) : (
                  ""
                )}
                {cat.component === 3 ? (
                  <ShopByCollection title={cat.title} data={cat.data} />
                ) : (
                  ""
                )}
                {cat.component === 4 ? (
                  <BestBuy mainTitle={cat.title} data={cat.data} />
                ) : (
                  ""
                )}
                {cat.component === 5 ? (
                  <BannerImage
                    alt={cat.title}
                    src={cat.image}
                    url_key={cat.url_key}
                  />
                ) : (
                  ""
                )}
                {cat.component === 6 ? <BestSeller /> : ""}
                {cat.component === 7 ? (
                  <RecommendForYou title={cat.title} data={cat.data} />
                ) : (
                  ""
                )}
                {cat.component === 8 ? (
                  <ShopByBrand title={cat.title} data={cat.data} />
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
        <NewUnboxBestSeller
          pageInfo={{
            pageType: "CATEGORY",
            catlevel1Name: "home-furnishings",
            catlevel2Name: "bedding",
            catlevel3Name: "bed-sheets"
          }}
        />
      </Section>
    );
  }
}
HomeFurnishingContainer.defaultProps = {
  category: [],
  seoInfo: {
    seo_text: ""
  }
};

HomeFurnishingContainer.propTypes = {
  category: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  seoInfo: PropTypes.object
};
export default HomeFurnishingContainer;
