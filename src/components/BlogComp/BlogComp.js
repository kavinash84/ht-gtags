import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MainSliderTwo from "components/mainSlider2";
import PackageBreadCrumb from "./blogsBreadcrumb";
import { getBlogsCatData } from "../../redux/modules/blogs";
const NextArrow = require("../../../static/blogsNextArrow.svg");

const BreadCrumpstyles = require("./breadcrumb.scss");
const styles = require("./index.scss");

const formatToCarosalData = data => {
  let arr = { data: [] };
  if (Array.isArray(data) && data.length) {
    arr.data = data.map(item => {
      return {
        id: item.key,
        title: item.title,
        description: item.title,
        image: item.image,
        type: "webview_layout",
        url_key: "/blogs",
        weData: item.title,
        meta: {
          name: item.title,
          id: item.key
        }
      };
    });
  }
  return arr;
};

@connect(({ blogs }) => ({
  homeData: blogs.homeData,
  currentCatData: blogs.currentCatData
}))
class BlogComp extends React.Component {
  state = { activeTab: 0, showMore: false };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleTabChange = id => {
    const { dispatch } = this.context.store;
    dispatch(getBlogsCatData(id));
    this.setState({ activeTab: id });
  };

  handleShowMore = () => {
    this.setState({ showMore: !this.state.showMore });
  };

  render() {
    const { activeTab, showMore } = this.state;
    const { homeData, currentCatData } = this.props;
    const catagoryPosts = showMore
      ? currentCatData
      : currentCatData.length && currentCatData.filter((item, i) => i <= 8);
    return (
      <div className={styles.blogs_main}>
        <div className={BreadCrumpstyles.BreadCrumb_wrapper2}>
          <PackageBreadCrumb />
        </div>
        <div>
          <MainSliderTwo
            secondmainbanner={formatToCarosalData(homeData.banner_list)}
          />
        </div>

        <div className={styles.cataagoryContainer}>
          <ul className={styles.catagoryList}>
            {homeData.category_list.length &&
              homeData.category_list.map(item => (
                <li
                  className={activeTab === item.key ? styles.activeTab : ""}
                  onClick={() => this.handleTabChange(item.key)}
                >
                  {item.name}
                </li>
              ))}
          </ul>

          <div className={styles.posts}>
            {catagoryPosts.length
              ? catagoryPosts.map(item => (
                  <div className={styles.post}>
                    <div className={styles.image_container}>
                      <img className={styles.image} src={item.banner_image} />
                    </div>
                    <div className={styles.title}>{item.post_title}</div>
                    <div className={styles.date}>{item.date}</div>
                  </div>
                ))
              : null}
          </div>
          <div className={styles.showMoreContainer}>
            {this.state.showMore ? null : (
              <div onClick={() => handleShowMore()}>
                <span>SHOW MORE</span>
                <img src={NextArrow} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default BlogComp;
