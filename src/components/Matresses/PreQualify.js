import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';

export class PreQualify extends Component {
    render() {
        const { data } = this.props;
        return (
            <Div style={{ display: 'flex', justifyContent: 'center' }} p="1rem 0rem">
                <Div p="1rem 3rem" style={{ width: '90%', backgroundColor: '#EBE6DC'}}>
                    <Text 
                        ta="center" 
                        fontSize="1rem"
                        color="#323231"
                    >
                        {data.text}
                        <span>
                            <Img
                                height="1.6rem"
                                mb="-0.4rem"
                                ml="0.5rem"
                                style={{ 
                                    display: 'inline-block' 
                                }} 
                                src={data.brand}
                                alt="Logo"
                            />
                        </span>
                    </Text>
                    {data.link.url ? (
                        <Link to={data.link.url}>
                            <Text
                                ta="center"
                                color="#323231"
                                fontSize="0.9rem"
                                style={{ 
                                    fontWeight: 'bold'
                                }}
                            >
                                <u>
                                    {data.link.text}
                                </u>
                            </Text>
                        </Link>
                    ) : (
                        <Text
                            ta="center"
                            color="#323231"
                            fontSize="0.9rem"
                            style={{
                                fontWeight: 'bold'
                            }}
                        >
                            <u>
                                {data.link.text}
                            </u>
                        </Text>
                    )}
                </Div>
            </Div>
        )
    }
}

export default PreQualify
