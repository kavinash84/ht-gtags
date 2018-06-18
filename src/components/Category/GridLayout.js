import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Title from 'components/Title';
import SquareCatItem from './SquareCatItem';
import RoundCatItem from './RoundCatItem';

const styles = require('./Grid.scss');

export default class GridLayout extends Component {
  render() {
    const {
      data, categoryName, layout, layoutStyle, col
    } = this.props;
    return (
      <Section p="0" pt="2.5rem" mb="0" className="catCarousel">
        <Container pr="0" pl="0">
          <Title title={categoryName} subTitle="" />
          <Row display="block" pt="0.625rem" ml="0" mr="0">
            {data.map(slide => (
              <Div col={col}>
                <div className={styles.catBlockWrapper} key={slide.category_id}>
                  {layout === 'round' ? (
                    <SquareCatItem
                      image={slide.image_url}
                      name={slide.info.name}
                      url={slide.info.url_key}
                      layout={layout}
                      layoutStyle={layoutStyle}
                    />
                  ) : (
                    <RoundCatItem
                      image={slide.image_url}
                      name={slide.info.name}
                      url={slide.info.url_key}
                      layout={layout}
                      layoutStyle={layoutStyle}
                    />
                  )}
                </div>
              </Div>
            ))}
          </Row>
        </Container>
      </Section>
    );
  }
}

GridLayout.defaultProps = {
  data: [],
  categoryName: '',
  layout: 'square',
  layoutStyle: 'slider',
  col: 3
};

GridLayout.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string,
  layout: PropTypes.string,
  layoutStyle: PropTypes.string,
  col: PropTypes.number
};
