import React from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Title from 'components/Title';
import SquareCatItem from './SquareCatItem';
import RoundCatItem from './RoundCatItem';

const styles = require('./Grid.scss');

const GridLayout = ({
  data, categoryName, layout, layoutStyle, col
}) => (
  <Section p="0" pt="0" mb="1.5rem" className="catCarousel">
    <Container pr="0" pl="0">
      <Title title={categoryName} subTitle="" ta="left" />
      <Row display="block" pt="0" ml="0" mr="0">
        {data.map((slide, index) => (
          <Div col={col} key={String(index)}>
            <div className={styles.catBlockWrapper} key={slide.category_id}>
              {layout === 'round' ? (
                <SquareCatItem
                  image={slide.image}
                  name={slide.title}
                  url={slide.url_key}
                  layout={layout}
                  layoutStyle={layoutStyle}
                />
              ) : (
                <RoundCatItem
                  image={slide.image}
                  name={slide.title}
                  url={slide.url_key}
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

export default GridLayout;
