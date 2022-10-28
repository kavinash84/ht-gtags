import React from "react";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { Link } from "react-router-dom";


const TopBanner = ({ topBanner }) => {
    return (
        <Div style={{ width: '100%', margin: '30px auto' }}>
            <Link to={topBanner.url_key}>
                <Image src={topBanner.image} alt='banner' style={{ width: '100%' }} />
            </Link>
        </Div>
    )
}

export default TopBanner;


