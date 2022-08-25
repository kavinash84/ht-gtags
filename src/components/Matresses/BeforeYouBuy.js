import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';

export class BeforeYouBuy extends Component {
    render() {
        const { data } = this.props;
        return (
            <Div mt="2rem" style={{ backgroundColor: '#F3EFE7'}}>
                <Heading mt="0.5rem" mb="5px" fontSize="22px" ta="center" p="0px 3rem" style={{
                    fontWeight: 'bold',
                    color:"#323231",
                    lineHeight:"36px",
                    whiteSpace: 'normal'
                }}>
                    {data.title}
                </Heading>
                <div style={{ width: '25px', borderTop: '2px solid #323231', margin: 'auto' }}></div>
                {data.values.map((elem, index) => (
                    <Div key={index} mt="1rem" p="1rem">
                        <Img src={elem.image} alt={elem.title} width="100%"/>
                        <Div p="1rem 1.5rem">
                            <Heading fontSize="20px" style={{ textAlign: 'center', color: '#323231' }}>
                                {elem.title}
                            </Heading>
                            <Text color="#323231" fontSize="1rem" ta="center">{elem.description}</Text>
                        </Div>    
                    </Div>
                ))}
            </Div>
        )
    }
}

export default BeforeYouBuy
