import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Row from "hometown-components-dev/lib/RowHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

const styles = require("./Stores.scss");

const StoreListItem = ({
  city,
  store,
  address,
  pincode,
  state,
  phone,
  url,
  gaVisitHandler
}) => (
  <Div col={12} mt="10px" mb="10px" textAlign="center">
    <div //eslint-disable-line
      onClick={e => {
        e.preventDefault();
        gaVisitHandler({
          city,
          store,
          event: "event storelocator-hmpg",
          category: "Storelocator- HMPG"
        });
      }}
      className={styles.storeBlock}
    >
      <Link to={url}>
        {/* <Img src="https://static.hometown.in/media/cms/hometownv2/compressed/New-Delhi.jpg" alt="" /> */}
        <Row type="block" m="0">
          <Div>
            <Heading
              ta="center"
              color="textDark"
              fontSize="1em"
              mt="0"
              pb="2px"
              mb="5px"
            >
              {store}
            </Heading>
            <Text
              ta="center"
              color="rgba(0,0,0,0.5)"
              fontSize="0.875em"
              mb="0.125rem"
              mt="0"
            >
              {address}
            </Text>
            <Text
              ta="center"
              color="rgba(0,0,0,0.5)"
              fontSize="0.875em"
              mb="0.125rem"
              mt="0"
            >
              {city}, {state}, {pincode}
            </Text>
            <Text
              ta="center"
              color="rgba(0,0,0,0.5)"
              fontSize="0.875em"
              mb="0"
              mt="0"
            >
              {phone}
            </Text>
          </Div>
        </Row>
      </Link>
    </div>
  </Div>
);

StoreListItem.defaultProps = {
  city: "",
  store: "",
  address: "",
  pincode: "",
  state: "",
  phone: "",
  url: ""
};

StoreListItem.propTypes = {
  city: PropTypes.string,
  store: PropTypes.string,
  address: PropTypes.string,
  pincode: PropTypes.string,
  state: PropTypes.string,
  phone: PropTypes.string,
  url: PropTypes.string,
  gaVisitHandler: PropTypes.func.isRequired
};

export default StoreListItem;
