import React, { Component } from 'react'
import Div from 'hometown-components/lib/Div';
import { Link } from 'react-router-dom';
import Img from 'hometown-components/lib/Img';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';

const quotes = require('../../../static/mattresses/Quotes.png');

const renderComponent = (index, elem, component, handleClick) => {
    switch(component) {
        case "1":
            return (
                <Div key={index} p="2rem" pl="1rem" pr="1rem" pb="0rem">
                    <Link to={elem.link} onClick={handleClick}>
                        <Div style={{
                            paddingBottom: '1rem',
                        }}>
                            <Img src={elem.image} alt={elem.heading} />
                            <Div pl="0px">
                                <Heading fontSize="19px" style={{ color:"#FFFFFF"}} ta="left" mb="0px">
                                    {elem.heading}
                                </Heading>
                                <Text color="#FFFFFF" fontSize="14px" mt="5px">
                                    {elem.description}
                                </Text>
                                {/* <Link to={elem.link} onClick={onClick}>
                                    <Text ta="left" mb="0px" mt="0px" className={styles.shopNow} style={{
                                        color: 'orangered',
                                        fontWeight: 'bold',
                                        textAlign: 'left'
                                    }}>
                                    Shop now
                                    </Text>
                                </Link> */}
                            </Div>
                        </Div>
                    </Link>
                </Div>
            )
        case "2":
            return (
                <Div key={index} p="2rem" pl="1rem" pr="0.5rem" pb="0rem">
                    <Link to={elem.link} onClick={handleClick}>
                        <Div style={{
                            paddingBottom: '1rem',
                        }}>
                            <Img src={elem.image} alt="brand logo" />
                        </Div>
                    </Link>
                </Div>
            )
        case "3":
            return (
                <Div key={index} p="2rem" pl="1.5rem" pr="0rem" pb="0rem">
                    <Link to={elem.link} onClick={handleClick}>
                        <Div style={{
                            paddingBottom: '1rem',
                        }}>
                            <Img src={elem.image} alt="brand logo" />
                            <Text fontSize="14px" color="#323231" ta="center" mb="0px">
                                {elem.title}
                            </Text>
                        </Div>
                    </Link>
                </Div>
            )
            case "4":
                return (
                    <Div key={index} p="0rem" pl="1.5rem" pr="0rem" pb="0rem">
                        {elem.id === '3' ? (
                            <a href="mailto: care@hometown.in">
                                <Div style={{
                                    paddingBottom: '1rem',
                                }}>
                                    <Div p="1rem 5rem">
                                        <Img src={elem.image} alt="brand logo" />
                                    </Div>
                                    <Div p="0px 0.7rem">
                                        <Heading fontSize="1.3rem" style={{ color:"#323231", textAlign:"center"}} mb="0px">
                                            {elem.title}
                                        </Heading>
                                        <Text color="#323231" fontSize="1rem" mt="5px" ta="center">
                                            {elem.description}
                                        </Text>
                                    </Div>
                                </Div>
                            </a>
                        ) : (
                            <Link to={elem.link} onClick={handleClick}>
                                <Div style={{
                                    paddingBottom: '1rem',
                                }}>
                                    <Div p="1rem 5rem">
                                        <Img src={elem.image} alt="brand logo" />
                                    </Div>
                                    <Div p="0px 0.7rem">
                                        <Heading fontSize="1.3rem" style={{ color:"#323231", textAlign:"center"}} mb="0px">
                                            {elem.title}
                                        </Heading>
                                        <Text color="#323231" fontSize="1rem" mt="5px" ta="center">
                                            {elem.description}
                                        </Text>
                                    </Div>
                                </Div>
                            </Link>
                        )}
                    </Div>
                )
            case "5":
                return (
                    <Div key={index} mt="1rem" p="0rem" pl="1.5rem" pr="0rem" pb="0rem">
                        <Link to={elem.link} onClick={handleClick}>
                            <Div style={{
                                paddingBottom: '1rem',
                            }}>
                                <Div p="0px">
                                    <Img src={elem.image} alt="brand logo" />
                                </Div>
                                <Div p="0rem">
                                    <Heading fontSize="0.9rem" style={{ color:"#323231", textAlign:"left"}} mb="0px">
                                        {elem.title}
                                    </Heading>
                                    {/* <Text color="#17245B" fontSize="1rem" mt="5px" ta="center">
                                        {elem.description}
                                    </Text> */}
                                </Div>
                            </Div>
                        </Link>
                    </Div>
                )
            case "6":
                return (
                    <Div p="0px 1rem">
                        <Div mt="2rem">
                            <Img src={elem.image} alt={elem.name} />
                            <Link to={elem.link} style={{
                                position: 'absolute',
                                top: '0px',
                                backgroundColor: 'rgba(254, 247, 230, 0.8)',
                                padding: '0px 1rem'
                            }}
                            onClick={handleClick}
                            >
                                <Text fontSize="0.8rem" style={{
                                    fontWeight: 'bold'
                                }}>
                                    {elem.name}
                                </Text>
                            </Link>
                        </Div>
                        <Div>
                            <Text fontSize="1rem" color="#17245B" mt="0.5rem" mb="0rem" style={{ fontWeight: 'bold' }}>{elem.customerName}</Text>
                            <Text fontSize="12px" color="#666666" mt="0px">{elem.location}</Text>
                        </Div>
                        <Div>
                            <Text fontSize="20px" color="#323231" style={{
                                lineHeight: '30px',
                                fontWeight: 'bold'
                            }}>{elem.comment}</Text>
                            <Img src={quotes} alt="Quote" style={{
                                position: 'absolute',
                                top: '0px',
                                height: '75px',
                                width: 'auto'
                            }}/>
                        </Div>
                    </Div>
                )
            default: null
    }
}


export class CarouselData extends Component {

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
        const {
            index,
            elem,
            component
        } = this.props;

        return (
            <div>
                {renderComponent(index, elem, component, this.handleClick)}
            </div>
        )
    }
}

export default CarouselData
