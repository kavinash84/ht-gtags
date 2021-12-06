import React from "react";
import PropTypes from "prop-types";
import Row from "hometown-components-dev/lib/Row";
import Div from "hometown-components-dev/lib/Div";
import Section from "hometown-components-dev/lib/Section";
import { connect } from "react-redux";
import MainFurnitureSlider from "./MainFurnitureSlider";
// import ShopByCategories from "./shopByCategories";

@connect(({ homepage: { menu }, category, category: { data } }) => ({
  menu: menu.data,
  category: data && data.items && data.items.text,
  //   categoryText: getText(category),
  seoInfo: data && data.seo && data.seo.items
}))

class FurnitureContainer extends React.Component {
  getBgColor = comp => {
    switch (comp) {
      case 2:
        return "linear-gradient(to right, rgb(234, 234, 234), white)";
        break;
      case 5:
        return "#F9F9F9";
        break;
      case 13:
        return "#F5EEEE";
        break;
      default:
        return "#FFFFFF";
    }
  };
  render() {
    const {
      category
      //   categoryText: { title: pageTitle }
    } = this.props;
    return (
      <Section p="0" mb="0">
        <div className="wrapper">
          {category && <MainFurnitureSlider data={category.main} mb="0" style={{width:'100%'}} />}
        </div>
      </Section>
    );
  }
}
FurnitureContainer.defaultProps = {
  category: [],
  seoInfo: {
    seo_text: ""
  }
};

FurnitureContainer.propTypes = {
  category: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  seoInfo: PropTypes.object
};
export default FurnitureContainer;