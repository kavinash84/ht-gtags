import Div from 'hometown-components/lib/Div'
import Img from 'hometown-components/lib/Img';
import React, { Component } from 'react'

export class mattressesVideo extends Component {
    render() {
        const { data } = this.props;
        return (
            <Div mt="2rem">
                {data.isVideo === "true" ? (
                    <video width="100%" height="auto" controls>
                        <source src={data.video} type="video/mp4" />
                    </video>
                ) : (
                    <Img src={data.image} alt="video" width="100%"/>
                )}

            </Div>
        )
    }
}

export default mattressesVideo
