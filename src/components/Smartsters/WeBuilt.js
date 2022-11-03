import React from "react";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";


const WeBuilt = ({ weBuilt }) => {
    return (
        <Div style={{ width: '100%', margin: '30px auto' }}>
            <Image src={weBuilt.image} alt='banner' style={{ width: '100%' }} />
        </Div>
    )
}

export default WeBuilt;


