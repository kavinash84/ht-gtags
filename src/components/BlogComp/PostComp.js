import React from "react";
import { connect } from "react-redux";
import PackageBreadCrumb from "./blogsBreadcrumb";

const BreadCrumpstyles = require("./breadcrumb.scss");
const styles = require("./index.scss");

@connect(({ blogs }) => ({
  currentPostData: blogs.currentPostData
}))
class PostComp extends React.Component {
  render() {
    const { currentPostData } = this.props;
    const postData = currentPostData[0] || "";
    return (
      <div className={styles.blogs_main}>
        <div className={BreadCrumpstyles.BreadCrumb_wrapper2}>
          <PackageBreadCrumb blogsTitle={postData.post_title} />
        </div>
        {postData ? (
          <div>
            <div className={styles.postBanner}>
              <img src={postData.banner_image} />
            </div>
            <div className={styles.descriptionContainer}>
              <div className={styles.description}>
                <div className={styles.title}>{postData.post_title}</div>
                <div className={styles.date}>{postData.created_at}</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PostComp;
