import React from "react";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { Link } from "react-router-dom";


const Signup = ({ signup }) => {

    return (
        <Div style={{ width: '92%', margin: '30px auto'}}>
            <Link to={signup.url_key} target='_blank' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '20px 0px', margin: '0 auto' }}>
                <Image src={signup.image} alt='signup' />
            </Link>
        </Div>
    )
}

export default Signup;


