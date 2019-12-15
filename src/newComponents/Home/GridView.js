import React from 'react';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';

/* ====== Page Components ====== */
import Title from 'newComponents/Title';

const GridView = ({
  categoryName
  // data
}) => (
  <Section>
    <Container>
      {categoryName !== null && (
        <Row justifyContent="center">
          <Title title={categoryName} />
        </Row>
      )}
      <Row>
        <Col variant="col-8" pl={10} pr={16}>
          <Row>
            <Col variant="col-8" px={10} mt={20}>
              <Box
                sx={{
                  height: '330px',
                  backgroundImage: 'url(https://www.hometown.in/media/cms/hometown201920/group-4.jpg)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  bg: 'filterBg'
                }}
              />
            </Col>
            <Col variant="col-4" px={10}>
              <Box
                sx={{
                  height: '400px',
                  backgroundImage: 'url(https://www.hometown.in/media/cms/hometown201920/plates.jpg)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  bg: 'filterBg'
                }}
              />
            </Col>
            <Col variant="col-5" px={10} mt={-30}>
              <Box
                sx={{
                  height: '400px',
                  backgroundImage: 'url(https://www.hometown.in/media/cms/hometown201920/group-2.jpg)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  bg: 'filterBg'
                }}
              />
            </Col>
            <Col variant="col-7" px={10} mt={20}>
              <Box
                sx={{
                  height: '400px',
                  backgroundImage: 'url(https://www.hometown.in/media/cms/hometown201920/group-7.jpg)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  bg: 'filterBg'
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col variant="col-4" px={10}>
          <Box
            mt={20}
            sx={{
              height: '300px',
              backgroundImage: 'url(https://www.hometown.in/media/cms/hometown201920/group-8.jpg)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              bg: 'filterBg'
            }}
          />
          <Box
            mt={20}
            sx={{
              height: '400px',
              backgroundImage: 'url(https://www.hometown.in/media/cms/hometown201920/group-3.jpg)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              bg: 'filterBg'
            }}
          />
          <Box mt={20}>
            <Button width={1} type="button" fontSize={20} height={50}>
              See All
            </Button>
          </Box>
        </Col>
      </Row>
    </Container>
  </Section>
);

GridView.defaultProps = {
  // data: [],
  categoryName: ''
};

GridView.propTypes = {
  // data: PropTypes.array,
  categoryName: PropTypes.string
};

export default GridView;
