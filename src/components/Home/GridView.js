import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatProductURL } from 'utils/helper';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';

/* ====== Page Components ====== */
import Title from 'components/Title';

const renderGrid = (data, isProduct, showList) => (
  <Row>
    <Col width={[1, 1, 8 / 12]} pl={10} pr={16}>
      <Row>
        {data.map(item => {
          if (item.grid && item.grid === 1) {
            let link = '';
            if (isProduct) {
              link = formatProductURL(item.meta.name, item.meta.sku);
            } else {
              const info = item.info || {};
              link = info.url_key || '';
            }
            return (
              <Col variant={item.variant} px={item.px} mt={item.mt}>
                <Link to={link}>
                  <Box
                    sx={{
                      height: item.height,
                      backgroundImage: `url(${item.image_url})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      bg: 'filterBg'
                    }}
                  />
                </Link>
              </Col>
            );
          }
          return '';
        })}
      </Row>
    </Col>
    <Col width={4 / 12} px={10} display={['none', 'none', 'block']}>
      {data.map(item => {
        if (item.grid && item.grid === 2) {
          let link = '';
          if (isProduct) {
            link = formatProductURL(item.meta.name, item.meta.sku);
          } else {
            const info = item.info || {};
            link = info.url_key || '';
          }

          return (
            <Link to={link}>
              <Box
                mt={item.mt}
                sx={{
                  height: item.height,
                  backgroundImage: `url(${item.image_url})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  bg: 'filterBg'
                }}
              />
            </Link>
          );
        }
        return '';
      })}
      {showList && (
        <Box mt={20}>
          <Link to={'/furniture/living-room-furniture/sofas/'}>
            <Button width={1} type="button" fontSize={20} height={50}>
              See All
            </Button>
          </Link>
        </Box>
      )}
    </Col>
  </Row>
);
const GridView = ({
 data, isProduct, categoryName, showList
}) => (
  <Section>
    <Container>
      {categoryName !== null && (
        <Row justifyContent="center">
          <Title title={categoryName} />
        </Row>
      )}
      {renderGrid(data, isProduct, showList)}
    </Container>
  </Section>
);

GridView.defaultProps = {
  data: [],
  isProduct: false,
  showList: false,
  categoryName: ''
};

GridView.propTypes = {
  data: PropTypes.array,
  isProduct: PropTypes.bool,
  showList: PropTypes.bool,
  categoryName: PropTypes.string
};

export default GridView;
