import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';

const styles = require('./style.scss');

export class GiftsByCategory extends Component {

    componentDidMount() {
        this.handleScrollPosition();
    }

    handleScrollPosition = () => {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
          window.scrollTo(0, parseInt(scrollPosition));
          setTimeout(function() {
            sessionStorage.removeItem('scrollPosition');
          }, 2000);
        }
    };

    handleClick = () => {
        sessionStorage.setItem("scrollPosition", window.pageYOffset);
    };

    render() {
        const {
            giftsByCategory
        } = this.props
        return (
            <div>
                <Div className={styles.giftsByCategory} mt="2rem">
                    <Heading mb="10px" ta="center" color="#323131" fontSize="22px" fontFamily="regular">
                        {giftsByCategory.title}
                    </Heading>
                    <div style={{ width: '30px', borderTop: '2px solid #323131', margin: 'auto' }}></div>
                    <Div className={styles.flexThree} p="0px 0.5rem" mt="1.5rem">
                        <Link to={giftsByCategory.data[0].link} onClick={this.handleClick}>
                            <Div p="0.5rem">
                                <Img data-src={giftsByCategory.data[0].image} alt={giftsByCategory.data[0].title} />
                                <Text ta="center" fontSize="14px" color="#222222">{giftsByCategory.data[0].title}</Text>
                            </Div>
                        </Link>
                        <Link to={giftsByCategory.data[1].link} onClick={this.handleClick}>
                            <Div p="0.5rem">
                                <Img data-src={giftsByCategory.data[1].image} alt={giftsByCategory.data[1].title}/>
                                <Text ta="center" fontSize="14px" color="#222222">{giftsByCategory.data[1].title}</Text>
                            </Div>
                        </Link>    
                    </Div>
                    <Div className={styles.flexThree} p="0px 0.5rem">
                        <Link to={giftsByCategory.data[2].link} onClick={this.handleClick}>
                            <Div p="0.5rem">
                                <Img data-src={giftsByCategory.data[2].image} alt={giftsByCategory.data[2].title} />
                                <Text ta="center" fontSize="14px" color="#222222">{giftsByCategory.data[2].title}</Text>
                            </Div>
                        </Link>    
                        <Link to={giftsByCategory.data[3].link} onClick={this.handleClick}>
                            <Div p="0.5rem">
                                <Img data-src={giftsByCategory.data[3].image} alt={giftsByCategory.data[3].title}/>
                                <Text ta="center" fontSize="14px" color="#222222">{giftsByCategory.data[3].title}</Text>
                            </Div>
                        </Link>    
                    </Div>
                    <Div className={styles.flexThree} p="0px 0.5rem">
                        <Link to={giftsByCategory.data[4].link} onClick={this.handleClick}>
                            <Div p="0.5rem">
                                <Img data-src={giftsByCategory.data[4].image} alt={giftsByCategory.data[4].title} />
                                <Text ta="center" fontSize="14px" color="#222222">{giftsByCategory.data[4].title}</Text>
                            </Div>
                        </Link>
                        <Link to={giftsByCategory.data[5].link} onClick={this.handleClick}>    
                            <Div p="0.5rem">
                                <Img data-src={giftsByCategory.data[5].image} alt={giftsByCategory.data[5].title}/>
                                <Text ta="center" fontSize="14px" color="#222222">{giftsByCategory.data[5].title}</Text>
                            </Div>
                        </Link>    
                    </Div>
                    <Div className={styles.flexThree} p="0px 0.5rem">
                        <Link to={giftsByCategory.data[6].link} onClick={this.handleClick}>
                            <Div p="0.5rem">
                                <Img data-src={giftsByCategory.data[6].image} alt={giftsByCategory.data[6].title} />
                                <Text ta="center" fontSize="14px" color="#222222">{giftsByCategory.data[6].title}</Text>
                            </Div>
                        </Link>
                        <Link to={giftsByCategory.data[7].link} onClick={this.handleClick}>    
                            <Div p="0.5rem">
                                <Img data-src={giftsByCategory.data[7].image} alt={giftsByCategory.data[7].title}/>
                                <Text ta="center" fontSize="14px" color="#222222">{giftsByCategory.data[7].title}</Text>
                            </Div>
                        </Link>     
                    </Div>
                </Div>
            </div>
        )
    }
}

export default GiftsByCategory
