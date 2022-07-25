import React from "react";
import image from './images/img.png';
import image2 from "./images/rec303.png";
import image3 from "./images/rec304.png"; 
import image4 from "./images/rec305.png";
import image5 from "./images/rec306.png";
import image6 from "./images/rec307.png";
import image7 from "./images/rec308.png";
import "./blogcomp.css"

class BlogComp extends React.Component {
    render() {
        return (
            <div className="main">

                <div>
                    <header>
                        HomeTown
                    </header>
                </div>
                <div>
                    <header className="blog">Blogs</header>
                </div>

                <img src={image} />

                <div className="lists">
                    <ul>
                        <li>
                            Design and Decorate
                        </li>
                        <li>
                            Organization
                        </li>
                        <li>
                            How-to-guides
                        </li>
                        <li>
                            LifeStyle
                        </li>
                    </ul>
                </div>
                

                <div className="images">
                    <div>
                        <img src={image2} className="img1" >

                        </img>
                        <h5>Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit,</h5>
                        <br />
                        <h6>12th January 2022</h6>
                    </div>
                    <div>
                        <img src={image3} className="img1"></img>
                        <h5>Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit,</h5>
                        <br />
                        <h6>12th January 2022</h6>
                    </div>
                    <div>
                        <img src={image4} className="img1"></img>
                        <h5>Lorem ipsum dolor sit amet, <br />consectetur adipiscing elit,</h5>
                        <br />
                        <h6>12th January 2022</h6>
                    </div>
                </div>

                <div className="images2">
                    <div>
                       <img src={image5} className="img1">

                    </img>
                    <h5>Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit,</h5>
                    <br />
                    <h6>12th January 2022</h6>
                </div>
                <div>
                    <img src={image6} className="img1"></img>
                    <h5>Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit,</h5>
                    <br />
                    <h6>12th January 2022</h6>
                </div>
                <div>
                    <img src={image7} className="img1"></img>
                    <h5>Lorem ipsum dolor sit amet, <br />consectetur adipiscing elit,</h5>
                    <br />
                    <h6>12th January 2022</h6>
                </div>
            </div>
                

            </div >
        )
    }
}

export default BlogComp;