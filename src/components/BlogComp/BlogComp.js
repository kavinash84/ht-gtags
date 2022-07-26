import React from "react";
import image from "./images/img.png";
import image2 from "./images/rec303.png";
import "./blogcomp.scss";

class BlogComp extends React.Component {
  render() {
    return (
      <div className="blogs_main">
        <img className="banner" src={image} />

        <div className="lists">
          <ul>
            <li>Design and Decorate</li>
            <li>Organization</li>
            <li>How-to-guides</li>
            <li>LifeStyle</li>
          </ul>
        </div>

        <div className="images">
          <div>
            <img src={image2} className="img1"></img>
            <h5>
              Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit,
            </h5>
            <br />
            <h6>12th January 2022</h6>
          </div>
          <div>
            <img src={image2} className="img1"></img>
            <h5>
              Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit,
            </h5>
            <br />
            <h6>12th January 2022</h6>
          </div>
          <div>
            <img src={image2} className="img1"></img>
            <h5>
              Lorem ipsum dolor sit amet, <br />
              consectetur adipiscing elit,
            </h5>
            <br />
            <h6>12th January 2022</h6>
          </div>
        </div>

        <div className="images2">
          <div>
            <img src={image2} className="img1"></img>
            <h5>
              Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit,
            </h5>
            <br />
            <h6>12th January 2022</h6>
          </div>
          <div>
            <img src={image2} className="img1"></img>
            <h5>
              Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit,
            </h5>
            <br />
            <h6>12th January 2022</h6>
          </div>
          <div>
            <img src={image2} className="img1"></img>
            <h5>
              Lorem ipsum dolor sit amet, <br />
              consectetur adipiscing elit,
            </h5>
            <br />
            <h6>12th January 2022</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogComp;
