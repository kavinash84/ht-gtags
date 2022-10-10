import React from "react";
import PropTypes from "prop-types";
import Row from "hometown-components-dev/lib/Row";
import Div from "hometown-components-dev/lib/Div";
import Section from "hometown-components-dev/lib/Section";
import { Link } from "react-router-dom";
import ResponsiveModal from "components/Modal";
import { connect } from "react-redux";
import MainFurnitureSlider from "./MainFurnitureSlider";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import CommonLayout from "./CommonLayout/CommonLayout";
import ShopOurNewArrivals from "./ShopOurNewArrivals";
import Essentials from "./Essentials/Essentials";
import LetUsHelpYou from "./LetUsHelp";
import ShopMattress from "./ShopMattress";
import BannerImage from "./BannerImage";
import Outdoor from "./Outdoor";
import BestSeller from "./BestSeller";
import NewUnboxBestSeller from "components/NewUnboxWidges/bestSeller";

@connect(({ homepage: { menu }, category, category: { data } }) => ({
  menu: menu.data,
  category: data && data.items && data.items.text,
  seoInfo: data && data.seo && data.seo.items
}))
class FurnitureContainer extends React.Component {
  state = {
    openModal: true
  };

  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };
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
                  <CommonLayout title={cat.title} data={cat.data} />
                ) : (
                  ""
                )}
                {cat.component === 3 ? (
                  <ShopOurNewArrivals
                    mainTitle={cat.mainTitle}
                    data={cat.data}
                  />
                ) : (
                  ""
                )}

                {cat.component === 4 ? (
                  <CommonLayout title={cat.title} data={cat.data} />
                ) : (
                  ""
                )}
                {cat.component === 5 ? (
                  <Essentials mainTitle={cat.title} data={cat.data} />
                ) : (
                  ""
                )}

                {cat.component === 6 ? (
                  <CommonLayout title={cat.title} data={cat.data} />
                ) : (
                  ""
                )}

                {cat.component === 7 ? (
                  <BannerImage
                    alt={cat.title}
                    src={cat.image}
                    url_key={cat.url_key}
                  />
                ) : (
                  ""
                )}

                {cat.component === 8 ? (
                  <CommonLayout title={cat.title} data={cat.data} />
                ) : (
                  ""
                )}
                {cat.component === 9 ? <BestSeller category={cat.title} /> : ""}

                {cat.component === 10 ? (
                  <BannerImage
                    alt={cat.title}
                    src={cat.image}
                    url_key={cat.url_key}
                  />
                ) : (
                  ""
                )}

                {cat.component === 11 ? (
                  <CommonLayout title={cat.title} data={cat.data} />
                ) : (
                  ""
                )}
                {cat.component === 12 ? (
                  <CommonLayout title={cat.title} data={cat.data} />
                ) : (
                  ""
                )}

                {cat.component === 13 ? (
                  <Outdoor
                    title={cat.title}
                    image1={cat.image1}
                    subtitle1={cat.subtitle1}
                    url_key1={cat.url_key1}
                    image2={cat.image2}
                    subtitle2={cat.subtitle2}
                    url_key2={cat.url_key2}
                  />
                ) : (
                  ""
                )}

                {cat.component === 14 ? (
                  <ShopMattress
                    image={cat.image}
                    url_key={cat.url_key}
                    title={cat.title}
                  />
                ) : (
                  ""
                )}

                {cat.component === 15 ? (
                  <LetUsHelpYou title={cat.title} data={cat.data} />
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
        <NewUnboxBestSeller
          pageInfo={{
            pageType: "CATEGORY",
            catlevel1Name: "furniture",
            catlevel2Name: "living-room-furniture",
            catlevel3Name: "sofas"
          }}
        />
        {category && category.popUp && category.popUp.display ? (
          <ResponsiveModal
            classNames={{ modal: "furntitureModal" }}
            onCloseModal={this.handleModal}
            open={this.state.openModal}
          >
            <Link to={category.popUp.url_key}>
              <img
                src={category.popUp.popUpImage}
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
          </ResponsiveModal>
        ) : null}
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
