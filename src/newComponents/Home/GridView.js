import React from 'react';
// import PropTypes from 'prop-types';

/* ====== Components ====== */
import Box from 'hometown-components/lib/BoxHtV1';
import Col from 'hometown-components/lib/ColHtV1';
import Row from 'hometown-components/lib/RowHtV1';
// import GridItem from 'hometown-components/lib/MasonryGrid/Item';
// import MasonryGrid from 'hometown-components/lib/MasonryGrid';

const HomeGridView = () => (
  <Box>
    <Row>
      <Col variant="col-8" px={10}>
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
            height: '450px',
            backgroundImage: 'url(https://www.hometown.in/media/cms/hometown201920/group-3.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            bg: 'filterBg'
          }}
        />
      </Col>
    </Row>
    {/* <MasonryGrid>
      <GridItem
        to="/home-furnishings/bedding/bed-sheets"
        src="https://www.hometown.in/media/cms/hometown201920/group-4.jpg"
      />
      <GridItem to="/home-furnishings" src="https://www.hometown.in/media/cms/hometown201920/group-8.jpg" />
      <GridItem to="/home-decor" src="https://www.hometown.in/media/cms/hometown201920/plates.jpg" />
      <GridItem to="/tableware" src="https://www.hometown.in/media/cms/hometown201920/group-7.jpg" />
      <GridItem to="/home-furnishings" src="https://www.hometown.in/media/cms/hometown201920/group-2.jpg" />
      <GridItem to="/home-decor" src="https://www.hometown.in/media/cms/hometown201920/group-3.jpg" />
      <GridItem to="/tableware" src="https://www.hometown.in/media/cms/hometown201920/group-4.jpg" />
      <GridItem to="/home-decor" src="https://www.hometown.in/media/cms/hometown201920/group-8.jpg" />
    </MasonryGrid> */}
  </Box>
);

HomeGridView.defaultProps = {};

HomeGridView.propTypes = {};

export default HomeGridView;
