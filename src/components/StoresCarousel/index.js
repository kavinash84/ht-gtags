import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Title from 'components/Title';
import StoresCarouselItem from './StoresCarouselItem';
import SlickSlider from '../SlickSlider';

const settings = {
  slidesToShow: 7,
  slidesToScroll: 7
};

export default class StoresCarousel extends Component {
  render() {
    const { data, title, subTitle } = this.props;
    return (
      <Section p="0" pt="2.5rem" mb="0" className="catCarousel">
        <Container pr="0" pl="0">
          <Title title={title} subTitle={subTitle} />
          <SlickSlider settings={settings}>
            {data.map((item, index) => (
              <div key={String(index)}>
                <StoresCarouselItem city={item.city} />
              </div>
            ))}
          </SlickSlider>
        </Container>
      </Section>
    );
  }
}

StoresCarousel.defaultProps = {
  data: [],
  title: '',
  subTitle: ''
};

StoresCarousel.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  subTitle: PropTypes.string
};
