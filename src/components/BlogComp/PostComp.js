import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import PackageBreadCrumb from "./blogsBreadcrumb";

const BreadCrumpstyles = require("./breadcrumb.scss");
const styles = require("./index.scss");

const validateDate = d => {
  if (Object.prototype.toString.call(d) === "[object Date]") {
    // it is a date
    if (isNaN(d)) {
      // d.getTime() or d.valueOf() will also work
      // date object is not valid
      return false;
    } else {
      // date object is valid
      return true;
    }
  } else {
    return false;
  }
};

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
                <div className={styles.date}>
                  {validateDate(item.created_at)
                    ? moment(item.created_at).format("Do MMMM YYYY")
                    : null}
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.post_desc }} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PostComp;
