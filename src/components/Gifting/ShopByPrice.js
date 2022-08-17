import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';

const styles = require('./style.scss');

export class ShopByPrice extends Component {

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
            shopByPrice
        } = this.props;
        return (
            <div>
                <Div className={styles.shopByPrice} mt="1rem" pt="1rem" pb="2rem">
                    <Heading mb="10px" ta="center" color="#323131" fontSize="22px" fontFamily="regular">
                        {shopByPrice.title}
                    </Heading>
                    <div style={{ width: '30px', borderTop: '2px solid #323131', margin: 'auto' }}></div>
                    <Div className={styles.flex}>
                        <Link to={shopByPrice.texts[0].link} onClick={this.handleClick}>
                            <Div className={styles.priceBlock}>
                                <Text ta="center" fontSize="14px" mb="0px" color="#323131" style={{ fontWeight: 'bold'}}>{shopByPrice.description}</Text>
                                <Text ta="center" fontSize="14px" mt="0px" color="#323131" style={{ fontWeight: 'bold'}}>{shopByPrice.texts[0].value}</Text>
                            </Div>
                        </Link>
                        <Link to={shopByPrice.texts[1].link} onClick={this.handleClick}>
                            <Div className={styles.priceBlock}>
                                <Text ta="center" fontSize="14px" mb="0px" color="#323131" style={{ fontWeight: 'bold'}}>{shopByPrice.description}</Text>
                                <Text ta="center" fontSize="14px" mt="0px" color="#323131" style={{ fontWeight: 'bold'}}>{shopByPrice.texts[1].value}</Text>
                            </Div>
                        </Link>
                    </Div>
                    <Div className={styles.flex}>
                        <Link to={shopByPrice.texts[2].link} onClick={this.handleClick}>
                            <Div className={styles.priceBlock}>
                                <Text ta="center" fontSize="14px" mb="0px" color="#323131" style={{ fontWeight: 'bold'}}>{shopByPrice.description}</Text>
                                <Text ta="center" fontSize="14px" mt="0px" color="#323131" style={{ fontWeight: 'bold'}}>{shopByPrice.texts[2].value}</Text>
                            </Div>
                        </Link>
                        <Link to={shopByPrice.texts[3].link} onClick={this.handleClick}>
                            <Div className={styles.priceBlock}>
                                <Text ta="center" fontSize="14px" mb="0px" color="#323131" style={{ fontWeight: 'bold'}}>{shopByPrice.description}</Text>
                                <Text ta="center" fontSize="14px" mt="0px" color="#323131" style={{ fontWeight: 'bold'}}>{shopByPrice.texts[3].value}</Text>
                            </Div>
                        </Link>
                    </Div>
                    <Div className={styles.flex}>
                        <Link to={shopByPrice.texts[4].link} onClick={this.handleClick}>
                            <Div className={styles.priceBlock}>
                                <Text ta="center" fontSize="14px" mb="0px" color="#323131" style={{ fontWeight: 'bold'}}>{shopByPrice.description}</Text>
                                <Text ta="center" fontSize="14px" mt="0px" color="#323131" style={{ fontWeight: 'bold'}}>{shopByPrice.texts[4].value}</Text>
                            </Div>
                        </Link>
                        <Link to={shopByPrice.texts[5].link} onClick={this.handleClick}>
                            <Div className={styles.priceBlock}>
                                <Text ta="center" fontSize="14px" mb="0px" color="#323131" style={{ fontWeight: 'bold'}}>{shopByPrice.description}</Text>
                                <Text ta="center" fontSize="14px" mt="0px" color="#323131" style={{ fontWeight: 'bold'}}>{shopByPrice.texts[5].value}</Text>
                            </Div>
                        </Link>
                    </Div>
                </Div>
            </div>
        )
    }
}

export default ShopByPrice
