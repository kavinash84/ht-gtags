import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';

const styles = require('./style.scss');

export class CarouselDataTwo extends Component {

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
            index,
            elem,
            categoryName
        } = this.props;
        return (
            <div>
                <Div key={index} p="1rem" pr="0rem" className={styles.cardTwo}>
                    <Div mb="1rem">
                        <Link to={elem.link1} onClick={this.handleClick}>
                            <Img data-src={elem.image1} alt={categoryName} />
                        </Link>    
                    </Div>
                    <Div>
                        <Link to={elem.link2} onClick={this.handleClick}>
                            <Img data-src={elem.image2} alt={categoryName} />
                        </Link>    
                    </Div>     
                </Div>
            </div>
        )
    }
}

export default CarouselDataTwo
