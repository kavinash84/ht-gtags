import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import ImageShimmer from "hometown-components-dev/lib/ImageShimmerHtV1";

const urlName = name => name.split(' ').join('-').toLowerCase();

const ColorOption = ({
  data, toggleShowMoreColorProducts, showmorecolorproducts, showmorecolorproductsCount
}) => (
    <Box>
      <Row active={!showmorecolorproducts} maxHeight={150} overflow="auto" mx={0}>
        {data.map((item, index) => {
          if (index < showmorecolorproductsCount) {
            return (
              <Col
                height={40}
                width={40}
                px={0}
                mr={10}
                mb={10}
              >
                <Link to={`/${urlName(item.meta.name)}/sku/${item.groupedattributes.sku}`} key={String(index)}>
                  <ImageShimmer src={`${item.swatch_image}`} height={40}>
                    {imageURL => (<Image
                      src={imageURL}
                      alt={item.meta.name}
                      width={40}
                      height={40}
                      sx={{ border: item.activeColor ? 'primaryLarge' : 'secondaryLarge' }}
                    />)}
                  </ImageShimmer>
                </Link>
              </Col>
            );
          }
          return '';
        })}
      </Row>
      {data.length > 5 && <Box>
        <Button variant="link" color="#f98d29" pr={60} onClick={toggleShowMoreColorProducts}>
          {showmorecolorproducts ? 'Show More Products' : 'Show Less'}
        </Button>
      </Box>}
    </Box>
  );
ColorOption.defaultProps = {
  showmorecolorproducts: true,
  toggleShowMoreColorProducts: () => { }
};
ColorOption.propTypes = {
  data: PropTypes.array.isRequired,
  showmorecolorproducts: PropTypes.bool,
  toggleShowMoreColorProducts: PropTypes.func,
  showmorecolorproductsCount: PropTypes.string.isRequired,
};

export default ColorOption;
