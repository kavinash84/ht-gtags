import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import { Link } from 'react-router-dom';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';

export class ShopPillows extends Component {
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
                <Heading mt="1rem" fontSize="22px" ta="center" p="0px 3rem" style={{
                    fontWeight: 'bold',
                    color:"#323231",
                    lineHeight:"36px",
                    whiteSpace: 'normal'
                }}>
                    {data.title}
                </Heading>
                <Link to={data.link.url} onClick={this.handleClick}>
                    <Text
                        ta="center"
                        fontSize='12px'
                        style={{ fontWeight: 'bold' }}
                    >
                        {data.link.text}
                        <span
                            style={{
                                fontSize: '1rem',
                                marginTop: '0.3rem',
                                marginLeft: '0.5rem',
                                fontWeight: 'bold'
                            }}
                        >
                            →
                        </span>
                    </Text>
                    <Img mt="1rem" src={data.image} alt={data.title} width="100%" />
                </Link>
            </Div>
        )
    }
}

export default ShopPillows
