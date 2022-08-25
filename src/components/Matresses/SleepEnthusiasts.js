import React, { Component } from 'react';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';

export class SleepEnthusiasts extends Component {
    render() {
        const { data } = this.props;
        return (
            <Div mt="2rem">
                <Heading fontSize="22px" ta="center" p="0px 3rem" mb="5px" mt="0px" style={{
                    fontWeight: 'bold',
                    color:"#323231",
                    lineHeight:"36px",
                    whiteSpace: 'normal'
                }}>
                    {data.title}
                </Heading>
                <div style={{ width: '25px', borderTop: '2px solid #17245B', margin: 'auto' }}></div>
                <Img mt="2rem" src={data.image} width="100%" alt={data.title}/>
                <Div style={{ backgroundColor: '#69878BE6'}} p="2rem">
                    <Text color="white" ta="center" fontSize="1rem">
                        {data.description}
                    </Text>
                </Div>
            </Div>
        )
    }
}

export default SleepEnthusiasts
