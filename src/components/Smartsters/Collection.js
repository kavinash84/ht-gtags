import React from "react";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { Link } from "react-router-dom";

const Collection = ({ collection }) => {
    return (
        <Div style={{ width: '100%', margin: '40px auto' }}>
            {collection.values.map(slide => (
                <Link
                    to={slide.url_key}
                >
                    <Div mt="60px" >
                        <Image data-src={slide.imgSrc} src={`${slide.imgSrc}?blur=30`} alt="general" style={{ width: "100%" }} />
                    </Div>
                </Link>
            ))}
        </Div>
    )
}

export default Collection;


