import React from "react";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { Link } from "react-router-dom";
import Text from 'hometown-components-dev/lib/TextHtV1';

const Bedroom = require('../../../static/smartsters/bed.png');


const Categories = ({ data }) => {
    return (
        <Div style={{ width: '95%', margin: '60px auto', display: 'flex' , justifyContent:'center'}}>
            {data.map(slide => (
                <Div style={{ margin: '0px 10px' }}>
                    <Link to={slide.url_key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Image src={slide.imgSrc} alt='banner' style={{ width: '100%', maxWidth:'180px'}} />
                        <Text>{slide.title}</Text>
                    </Link>
                </Div>
            ))}

        </Div>
    )
}

export default Categories;


