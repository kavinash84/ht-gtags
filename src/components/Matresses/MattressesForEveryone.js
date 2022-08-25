import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';

export class MattressesForEveryone extends Component {
    componentDidMount() {
        this.handleScrollPosition();
    }

    handleScrollPosition = () => {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
          window.scrollTo(0, parseInt(scrollPosition));
          setTimeout(function() {
            sessionStorage.removeItem('scrollPosition');
          }, 1000);
        }
    };

    handleClick = () => {
        sessionStorage.setItem("scrollPosition", window.pageYOffset);
    };

    render() {
        const { data } = this.props
        return (
            <Div mt="2rem">
                <Heading fontSize="22px" ta="center" mt="0.5rem" mb="5px" p="0px 3rem" style={{
                    fontWeight: 'bold',
                    color:"#17245B",
                    lineHeight:"36px",
                    whiteSpace: 'normal'
                }}>
                    {data.title}
                </Heading>
                <div style={{ width: '25px', borderTop: '2px solid #17245B', margin: 'auto' }}></div>
                {data.collection.length ? data.collection.map((row, index) => (
                    <Row key={index} mr="0px" ml="0px" mt="1rem" style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Link to={row.link1} style={{ width: '40%', marginRight: "10px" }} onClick={this.handleClick}>
                            <Div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <Img src={row.image1} alt={row.name1} width="100%"/>
                                <Text fontSize="1rem" color="#17245B">{row.name1}</Text>
                            </Div>
                        </Link>
                        <Link to={row.link2} style={{ width: '40%' }}>
                            <Div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <Img src={row.image2} alt={row.name2} width="100%"/>
                                <Text fontSize="1rem" color="#17245B">{row.name2}</Text>
                            </Div>
                        </Link>
                    </Row>
                )): null}
            </Div>
        )
    }
}

export default MattressesForEveryone
