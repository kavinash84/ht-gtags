import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

/**
 * Modules / Helpers / Selectors
 */
import * as actionCreators from 'redux/modules/cart';
import { getCartListSKU } from 'selectors/cart';
import { PINCODE, CART_URL } from 'helpers/Constants';

const checkSKUInCart = (list, sku) => {
  // list.includes(sku)
  let isAlreadyAdded = false;
  const simpleSKUS = sku.skus || [];
  const skusList = [];
  simpleSKUS.forEach(item => {
    const simpleSKUItem = item.sku || '';
    const skuItem = simpleSKUItem.split('-')[0];
    if (skuItem) {
      skusList.push(skuItem);
    }
  });
  if (list.length && skusList.length) {
    isAlreadyAdded = skusList.every(val => list.includes(val));
  }
  return isAlreadyAdded;
};

const LoaderIcon = require('../../../static/refresh-black.svg');

const onClick = (item, session, pincode) => dispatcher => e => {
  e.preventDefault();
  const {
 id_catalog_buildyourset: setId, skus, unique_set_name: uniqueSetName = 'unknown', products
} = item;
  const configId = products.map(val => val.meta.config_id);
  const simpleSKUS = skus.map(val => ({ simple_sku: val.sku, qty: Number(val.qty) }));
  dispatcher(setId, simpleSKUS, session, pincode, configId, uniqueSetName);
};

const mapStateToProps = ({
 app: { sessionId }, pincode, cart, cart: { addingToCart, addedToCart, key }
}) => ({
  session: sessionId,
  pincode: pincode.selectedPincode ? pincode.selectedPincode : PINCODE,
  addingToCart,
  stateId: key,
  addedToCart,
  cartSKUs: getCartListSKU(cart)
});

const AddToCartCombined = ({
  session,
  addToCartCombined,
  pincode,
  addingToCart,
  skusData,
  products,
  cartSKUs,
  stateId
}) => {
  const checkStatus = checkSKUInCart(cartSKUs, skusData);
  // const { skus } = skusData;
  const { id_catalog_buildyourset: itemId } = skusData;
  const addLoading = addingToCart && stateId === itemId;
  return (
    <Fragment>
      {!checkStatus ? (
        <Button
          variant="outline.primary.large"
          width={240}
          disabled={addLoading}
          onClick={onClick(skusData, session, pincode)(addToCartCombined)}
          sx={{ fontSize: 14 }}
        >
          {addLoading && <Image className="spin" src={LoaderIcon} width="18px" mr={10} />}
          {addLoading ? 'Adding..' : `Add ${products && products.length ? `${products.length} items` : ''} to Cart`}
        </Button>
      ) : (
        <Row mx={0} alignItems="center">
          <Box as={Link} to={CART_URL} width={1}>
            <Button variant="outline.primary.large" width={240} sx={{ fontSize: 14 }}>
              Added to Cart
            </Button>
          </Box>
        </Row>
      )}
    </Fragment>
  );
};

AddToCartCombined.defaultProps = {
  addingToCart: false,
  cartSKUs: [],
  skusData: {},
  products: [],
  stateId: ''
};

AddToCartCombined.propTypes = {
  session: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  addToCartCombined: PropTypes.func.isRequired,
  stateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  addingToCart: PropTypes.bool,
  skusData: PropTypes.object,
  products: PropTypes.array,
  cartSKUs: PropTypes.array
};

export default connect(mapStateToProps, { ...actionCreators })(AddToCartCombined);
