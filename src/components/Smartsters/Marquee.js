import React from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";

const Ellipse = require('../../../static/smartsters/ellipse.png');


import "./Marquee.css";

const Marquee = () => {
    return (
        <Div style={{ width: '100%', margin: '60px auto' }}>
            <section>
                <div className="divmain">
                    <section class="news-message">
                        <p>Ergonomic Designs</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '20px', height: '30px', width: '50px' }} />
                        <p>Waterproof Paints</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '20px', height: '30px', width: '50px' }} />
                        <p>Designed for Safety, Self-Sufficiency, Durability & Growth</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '20px', height: '30px', width: '50px' }} />
                        <p>Scratch-Proof Laminates</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '20px', height: '30px', width: '50px' }} />
                    </section>
                    <section class="news-message">
                        <p>Ergonomic Designs</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '20px', height: '30px', width: '50px' }} />
                        <p>Waterproof Paints</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '20px', height: '30px', width: '50px' }} />
                        <p>Designed for Safety, Self-Sufficiency, Durability & Growth</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '20px', height: '30px', width: '50px' }} />
                        <p>Scratch-Proof Laminates</p>
                        <img src={Ellipse} alt='ellipse' style={{ paddingLeft: '20px', height: '30px', width: '50px' }} />
                    </section>
                </div>
            </section>
        </Div>
    )
}

export default Marquee;


