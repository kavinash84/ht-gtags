import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import { Link } from 'react-router-dom';
import Text from 'hometown-components/lib/Text';

export class MattressesByComfort extends Component {

    componentDidMount() {
        this.handleScrollPosition();
    }

    handleScrollPosition = () => {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
          window.scrollTo(0, parseInt(scrollPosition));
          setTimeout(function() {
            sessionStorage.removeItem('scrollPosition');
          }, 500);
        }
    };

    handleClick = () => {
        sessionStorage.setItem("scrollPosition", window.pageYOffset);
    };

    render() {
        const { data } = this.props;
        return (
            <Div mt="2rem">
                <Heading mt="0.5rem" mb="5px" fontSize="22px" ta="center" p="0px 3rem" style={{
                    fontWeight: 'bold',
                    color:"#323231",
                    lineHeight:"36px",
                    whiteSpace: 'normal'
                }}>
                    {data.title}
                </Heading>
                <div style={{ width: '25px', borderTop: '2px solid #323231', margin: 'auto' }}></div>
                <Row mt="1rem" style={{
                    justifyContent: 'center'
                }}>
                    {data.values.map((elem, index) => (
                        <Link to={elem.link} style={{ margin: '0px 0.5rem'}} onClick={this.handleClick}>
                            <Div style={{ width: '4.5rem'}}>
                                <Div key={index} p="1rem" style={{ backgroundColor: '#F3EFE7'}}>
                                    <Img src={elem.image} alt={elem.title} width="2.7rem"/>
                                </Div>
                                <Text ta="center">{elem.title}</Text>
                            </Div>
                        </Link>
                    ))}
                </Row>
            </Div>
        )
    }
}

export default MattressesByComfort
