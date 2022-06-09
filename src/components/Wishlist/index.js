import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "redux/modules/wishlist";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import { formatAmount } from "utils/formatters";
import { setProductPosition } from "redux/modules/productdetails";
import { formatProductURL } from "utils/helper";
import Product from "./Product";
import AddToCart from "../AddToCart";

const getProductImage = images => {
  const image =
    images &&
    images.length > 0 &&
    (images.filter(i => i.main === "1")[0] || images[0]);
  if (!image || !image.path) return "";
  const pp = `${image.path.split("/").slice(-1)}`;
  return image.path.replace(pp, "1-product_500.jpg");
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...actionCreators, productPosition: setProductPosition },
    dispatch
  );
const mapStateToProps = ({ pincode }) => ({
  selectedPincode: pincode.selectedPincode
});
const onClick = (list, dispatcher) => sku => e => {
  e.preventDefault();
  dispatcher(list, sku);
};

const isInWishList = (list, id) => list.includes(id);

class Wishlist extends React.Component {
  render() {
    const {
      list,
      toggleWishList,
      wishList,
      loadingList,
      productPosition,
      selectedPincode
    } = this.props;

    return (
      <Container px={0} my={50}>
        <Heading
          pb={10}
          mb={30}
          sx={{
            fontFamily: "HelveticaNeue",
            fontSize: "21px",
            fontWeight: "bold",
            color: "#474747",
            borderBottom: "divider"
          }}
        >
          My Wishlist: {list.length} items
        </Heading>
        <Flex mx={-8} sx={{ flexWrap: "wrap" }}>
          {list.map((item, i) => (
            <Box
              key={`${
                item.wishlist_info && item.wishlist_info.configurable_sku
                  ? item.wishlist_info.configurable_sku
                  : ""
              }_${String(i)}`}
              width={1 / 4}
              mb={40}
              px={8}
              // className={styles.productWrapper}
            >
              {!item.product_info.soldout ? (
                <Product
                  key={item.product_info.id}
                  name={item.product_info.data.name}
                  price={item.product_info.netprice}
                  cutprice={item.product_info.cutprice}
                  saving={item.product_info.saving}
                  image={getProductImage(item.product_info.images)}
                  sku={item.product_info.data.sku}
                  onClick={onClick(list, toggleWishList)}
                  onOpenQuickViewModal={() => {
                    this.onOpenQuickViewModal(
                      item.product_info.data.sku,
                      Object.keys(item.product_info.data.simples)[0],
                      item.product_info.soldout,
                      item.product_info.data.reviews.rating.toFixed(1),
                      item.wishlist_info.delivery_details &&
                        item.wishlist_info.delivery_details[0].value
                    );
                  }}
                  isWishList={isInWishList(
                    wishList,
                    item.product_info.data.sku
                  )}
                  skuLoading={isInWishList(
                    loadingList,
                    item.product_info.data.sku
                  )}
                  rating={item.product_info.data.reviews.rating.toFixed(1)}
                  reviewsCount={item.product_info.data.reviews.count}
                  /* eslint-disable max-len */
                  savingAmount={
                    item.product_info.data.max_special_price
                      ? formatAmount(
                          Number(item.product_info.data.max_price) -
                            Number(item.product_info.data.max_special_price)
                        )
                      : 0
                  }
                  deliveredBy={
                    item.wishlist_info.delivery_details &&
                    item.wishlist_info.delivery_details[0].value
                  }
                  pincode={selectedPincode}
                  setProductPosition={productPosition}
                  productURL={formatProductURL(
                    item.product_info.data.name,
                    item.product_info.data.sku
                  )}
                />
              ) : (
                <Product
                  key={item.product_info.id_catalog_config}
                  name={item.product_info.name}
                  price={item.product_info.price}
                  // cutprice={item.product_info.cutprice}
                  // saving={item.product_info.saving}
                  image={item.product_info.image}
                  sku={item.wishlist_info.configurable_sku}
                  onClick={onClick(list, toggleWishList)}
                  onOpenQuickViewModal={() => {
                    // this.onOpenQuickViewModal(
                    //   item.product_info.data.sku,
                    //   Object.keys(item.product_info.data.simples)[0],
                    //   item.product_info.soldout,
                    //   item.product_info.data.reviews.rating.toFixed(1),
                    //   item.wishlist_info.delivery_details &&
                    //     item.wishlist_info.delivery_details[0].value
                    // );
                  }}
                  isWishList={isInWishList(
                    wishList,
                    item.wishlist_info.configurable_sku
                  )}
                  skuLoading={isInWishList(
                    loadingList,
                    item.wishlist_info.configurable_sku
                  )}
                  // rating={item.product_info.data.reviews.rating.toFixed(1)}
                  // reviewsCount={item.product_info.data.reviews.count}
                  // /* eslint-disable max-len */
                  // savingAmount={
                  //   item.product_info.data.max_special_price
                  //     ? formatAmount(
                  //         Number(item.product_info.data.max_price) -
                  //           Number(item.product_info.data.max_special_price)
                  //       )
                  //     : 0
                  // }
                  // deliveredBy=""
                  pincode={selectedPincode}
                  setProductPosition={productPosition}
                  productURL={formatProductURL(
                    item.product_info.name || "",
                    item.wishlist_info.configurable_sku || ""
                  )}
                />
              )}
              <Box mt={14} width="65%" m="auto">
                {!item.product_info.soldout ? (
                  <AddToCart
                    simpleSku={Object.keys(item.product_info.data.simples)[0]}
                    sku={item.product_info.data.sku}
                    itemId={item.product_info.id}
                    isSoldOut={item.product_info.soldout}
                    configId={item.product_info.data.config_id}
                    size="medium"
                    height={36}
                  />
                ) : (
                  <AddToCart
                    simpleSku=""
                    sku={item.wishlist_info.configurable_sku}
                    itemId=""
                    isSoldOut={true}
                    configId=""
                    size="medium"
                    height={36}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Flex>
      </Container>
    );
  }
}
Wishlist.defaultProps = {
  wishList: [],
  list: [],
  loadingList: [],
  selectedPincode: ""
};

Wishlist.propTypes = {
  toggleWishList: PropTypes.func.isRequired,
  productPosition: PropTypes.func.isRequired,
  wishList: PropTypes.array,
  list: PropTypes.array,
  loadingList: PropTypes.array,
  selectedPincode: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
