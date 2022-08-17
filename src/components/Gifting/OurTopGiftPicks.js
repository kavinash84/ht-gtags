import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';

const styles = require('./style.scss');

export class OurTopGiftPicks extends Component {

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
            OurTopGiftPicks
        } = this.props;
        return (
            <div>
                <Div className={styles.OurTopGiftPicks} mt="2rem">
                    <Heading mb="10px" ta="center" color="#222222" fontSize="22px" fontFamily="regular">
                        {OurTopGiftPicks.title}
                    </Heading>
                    <div style={{ width: '30px', borderTop: '2px solid #323131', margin: 'auto' }}></div>
                    {OurTopGiftPicks.data.map((img, index) => (
                        <Div key={index} mt={index === 0 ? "1rem" : "2.5rem"}>
                            <Link to={img.link} onClick={this.handleClick}>
                                <Img data-src={img.image} alt="Top Gift Picks" />
                            </Link>    
                        </Div>    
                    ))}
                </Div>
            </div>
        )
    }
}

export default OurTopGiftPicks
