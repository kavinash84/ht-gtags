import React from 'react';
// import PropTypes from 'prop-types';

/* ====== Components ====== */
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
import GridItem from 'hometown-components/lib/MasonryGrid/Item';
import MasonryGrid from 'hometown-components/lib/MasonryGrid';

const HomeGridView = () => (
  <BoxHtV1>
    <MasonryGrid>
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
    </MasonryGrid>
  </BoxHtV1>
);

HomeGridView.defaultProps = {};

HomeGridView.propTypes = {};

export default HomeGridView;
