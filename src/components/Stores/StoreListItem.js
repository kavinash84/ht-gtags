import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Row from "hometown-components-dev/lib/RowHtV1";
// import Div from "hometown-components/lib/Div";
// import Text from "hometown-components/lib/Text";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import Img from 'hometown-components/lib/Img';

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
  <div style={{ marginTop: "10px" }} col={12}>
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
          <div>
            <HeadingHtV1
              ta="center"
              color="textDark"
              fontSize="1em"
              mt="0"
              pb="2px"
              mb="5px"
            >
              {store}
            </HeadingHtV1>
            <div
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "0.875rem",
                marginBottom: "0.12rem"
              }}
            >
              {address}
            </div>
            <div
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "0.875rem",
                marginBottom: "0.12rem"
              }}
            >
              {city}, {state}, {pincode}
            </div>
            <div
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "0.875rem",
                marginBottom: "0.12rem"
              }}
            >
              {phone}
            </div>
          </div>
        </Row>
      </Link>
    </div>
  </div>
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
