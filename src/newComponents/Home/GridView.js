import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';

const renderGrid = data => (
  <Row>
    <Col variant="col-8" pl={10} pr={16}>
      <Row>
        {data.map(item => {
            if (item.grid && item.grid === 1) {
              const {
                info: { url_key: link }
              } = item;
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
    <Col variant="col-4" px={10}>
      {data.map(item => {
          if (item.grid && item.grid === 2) {
            const {
              info: { url_key: link }
            } = item;
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
    </Col>
  </Row>
  );
const GridView = ({ data }) => (
  <Section>
    <Container>{renderGrid(data)}</Container>
  </Section>
);

GridView.defaultProps = {
  data: []
};

GridView.propTypes = {
  data: PropTypes.array
};

export default GridView;
