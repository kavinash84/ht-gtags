import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';

export class MattressProtectors extends Component {
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
                <Link to={data.link} onClick={this.handleClick}>
                    <Img src={data.image} alt={data.title} />
                    <Div style={{
                        position: 'absolute',
                        width: '100%',
                        bottom: '-2rem'
                    }}>
                        <Text ta="center" color="#FFFFFF" fontSize="1rem" m=" 0px auto" p="0.8rem" style={{ width: '80%', backgroundColor: '#69878B', fontWeight: 'bold'}}>{data.title}</Text>
                    </Div>
                </Link>
            </Div>
        )
    }
}

export default MattressProtectors
