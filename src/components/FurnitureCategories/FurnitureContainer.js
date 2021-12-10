import React from "react";
import PropTypes from "prop-types";
import Row from "hometown-components-dev/lib/Row";
import Div from "hometown-components-dev/lib/Div";
import Section from "hometown-components-dev/lib/Section";
import { connect } from "react-redux";
import MainFurnitureSlider from "./MainFurnitureSlider";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import CommonLayout from "./CommonLayout/CommonLayout";
@connect(({ homepage: { menu }, category, category: { data } }) => ({
  menu: menu.data,
  category: data && data.items && data.items.text,
  seoInfo: data && data.seo && data.seo.items
}))

class FurnitureContainer extends React.Component {

  render() {
    const {
      category
    } = this.props;
    return (
      <Section p="0" mb="0">
        <div className="wrapper">
          {category && <MainFurnitureSlider data={category.main} mb="0" style={{width:'100%'}} />}
          
          {category &&
                  category.sections &&
                  category.sections.map((cat, index) => (
                    <div key={String(index)} style={{ width: '100%' }}>
                      {cat.component === 1 ? (
                        <ShopByCategory title={cat.title} data={cat.data} />
                      ) : (
                        ''
                      )}   
                      {cat.component === 3 ? (
                        <CommonLayout title={cat.title} data={cat.data} />
                      ) : (
                        ''
                      )} 
                      {cat.component === 4 ? (
                        <CommonLayout title={cat.title} data={cat.data} />
                      ) : (
                        ''
                      )} 
                      {cat.component === 6 ? (
                        <CommonLayout title={cat.title} data={cat.data} />
                      ) : (
                        ''
                      )} 
                      {cat.component === 8 ? (
                        <CommonLayout title={cat.title} data={cat.data} />
                      ) : (
                        ''
                      )} 
                      {cat.component === 9 ? (
                        <CommonLayout title={cat.title} data={cat.data} />
                      ) : (
                        ''
                      )} 
                      {cat.component === 20 ? (
                        <CommonLayout title={cat.title} data={cat.data} />
                      ) : (
                        ''
                      )} 

                    </div>
                  ))}
          
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