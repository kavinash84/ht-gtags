import React from "react";
import image from "./images/img.png";
import image2 from "./images/rec303.png";
import PackageBreadCrumb from "./blogsBreadcrumb";

const BreadCrumpstyles = require("./breadcrumb.scss");
const styles = require("./index.scss");

class BlogComp extends React.Component {
  state = { activeTab: 0 };

  handleTabChange = id => {
    this.setState({ activeTab: id });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div className={styles.blogs_main}>
        <div className={BreadCrumpstyles.BreadCrumb_wrapper2}>
          <PackageBreadCrumb />
        </div>
        <img className={styles.banner} src={image} />

        <div className={styles.cataagoryContainer}>
          <ul className={styles.catagoryList}>
            <li
              className={activeTab === 0 ? "activeTab" : ""}
              onClick={() => this.handleTabChange(0)}
            >
              Design and Decorate
            </li>
            <li
              className={activeTab === 1 ? "activeTab" : ""}
              onClick={() => this.handleTabChange(1)}
            >
              Organization
            </li>
            <li
              className={activeTab === 2 ? "activeTab" : ""}
              onClick={() => this.handleTabChange(2)}
            >
              How-to-guides
            </li>
            <li
              className={activeTab === 3 ? "activeTab" : ""}
              onClick={() => this.handleTabChange(3)}
            >
              LifeStyle
            </li>
          </ul>

          <div className={styles.posts}>
            <div className={styles.post}>
              <img className={styles.image} src={image2} />
              <div className={styles.title}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </div>
              <div className={styles.date}>12th January 2022</div>
            </div>
            <div className={styles.post}>
              <img className={styles.image} src={image2} />
              <div className={styles.title}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </div>
              <div className={styles.date}>12th January 2022</div>
            </div>
            <div className={styles.post}>
              <img className={styles.image} src={image2} />
              <div className={styles.title}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </div>
              <div className={styles.date}>12th January 2022</div>
            </div>
            <div className={styles.post}>
              <img className={styles.image} src={image2} />
              <div className={styles.title}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </div>
              <div className={styles.date}>12th January 2022</div>
            </div>
            <div className={styles.post}>
              <img className={styles.image} src={image2} />
              <div className={styles.title}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </div>
              <div className={styles.date}>12th January 2022</div>
            </div>
            <div className={styles.post}>
              <img className={styles.image} src={image2} />
              <div className={styles.title}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </div>
              <div className={styles.date}>12th January 2022</div>
            </div>
            <div className={styles.post}>
              <img className={styles.image} src={image2} />
              <div className={styles.title}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </div>
              <div className={styles.date}>12th January 2022</div>
            </div>
            <div className={styles.post}>
              <img className={styles.image} src={image2} />
              <div className={styles.title}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </div>
              <div className={styles.date}>12th January 2022</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogComp;
