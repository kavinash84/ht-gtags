import React, { Component } from 'react'
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import GiftingCarouselTwo from './GiftingCarouselTwo';

const styles = require('./style.scss');

export class GiftsByOccasionTwo extends Component {

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
            giftsByOccasionTwo 
        } = this.props;

        return (
            <div>
                <Div className={styles.giftsByOccasionTwo} mt="1.5rem">
                    <Heading mb="10px" ta="center" color="#323131" fontSize="22px" fontFamily="regular">
                        {giftsByOccasionTwo.title}
                    </Heading>
                    <div style={{ width: '30px', borderTop: '2px solid #323131', margin: 'auto' }}></div>
                    <div className={styles.carouselbg}>
                        <Div className={styles.carousel}>
                            {giftsByOccasionTwo.data.map((data, index) => (
                                <div key={index}>
                                    <GiftingCarouselTwo categoryName={data.title} data={data.images} link={data.link} onClick={this.handleClick}/>
                                </div>
                            ))}
                        </Div>
                    </div>
                </Div>
            </div>
        )
    }
}

export default GiftsByOccasionTwo
