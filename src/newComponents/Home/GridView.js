import React from 'react';
// import PropTypes from 'prop-types';

/* ====== Components ====== */
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ColHtV1 from 'hometown-components-dev/lib/ColHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
// import GridItem from 'hometown-components-dev/lib/MasonryGrid/Item';
// import MasonryGrid from 'hometown-components-dev/lib/MasonryGrid';

const HomeGridView = () => (
  <BoxHtV1>
    <RowHtV1>
      <ColHtV1 variant="col-8" px={10}>
        <RowHtV1>
          <ColHtV1 variant="col-8" px={10} mt={20}>
            <BoxHtV1
              sx={{
                height: '330px',
                backgroundImage: 'url(https://www.hometown.in/media/cms/hometown201920/group-4.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                bg: 'filterBg'
              }}
            />
          </ColHtV1>
          <ColHtV1 variant="col-4" px={10}>
            <BoxHtV1
              sx={{
                height: '400px',
                backgroundImage: 'url(https://www.hometown.in/media/cms/hometown201920/plates.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                bg: 'filterBg'
              }}
            />
          </ColHtV1>
          <ColHtV1 variant="col-5" px={10} mt={-30}>
            <BoxHtV1
              sx={{
                height: '400px',
                backgroundImage: 'url(https://www.hometown.in/media/cms/hometown201920/group-2.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                bg: 'filterBg'
              }}
            />
          </ColHtV1>
          <ColHtV1 variant="col-7" px={10} mt={20}>
            <BoxHtV1
              sx={{
                height: '400px',
                backgroundImage: 'url(https://www.hometown.in/media/cms/hometown201920/group-7.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                bg: 'filterBg'
              }}
            />
          </ColHtV1>
        </RowHtV1>
      </ColHtV1>
      <ColHtV1 variant="col-4" px={10}>
        <BoxHtV1
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
        <BoxHtV1
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
      </ColHtV1>
    </RowHtV1>
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
  </BoxHtV1>
);

HomeGridView.defaultProps = {};

HomeGridView.propTypes = {};

export default HomeGridView;
