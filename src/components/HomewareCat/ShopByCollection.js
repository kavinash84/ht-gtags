import React, { Component } from "react";
import { Link } from "react-router-dom";
import RowHtV1 from "hometown-components-dev/lib/RowHtV1";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
class ShopByCollection extends React.Component {
  render() {
    const { data, title } = this.props;
    return (
      <div>
        <RowHtV1 justifyContent="center" mx={0}>
          <HeadingHtV1
            fontFamily="medium"
            style={{ textAlign: "center", color: "#323131" }}
            fontSize="40px"
            mt="90px"
            mb="20px"
          >
            {title}
          </HeadingHtV1>
        </RowHtV1>
        <div
          style={{
            width: "30px",
            borderTop: "2px solid #222222",
            margin: "auto",
            marginBottom: "10px"
          }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            // margin: "auto",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          {data.map((val, index) => (
            <div
              style={{
                justifyContent: "center",
                alignContent: "center",
                display: "flex",
                marginTop: "30px",
                marginBottom: "10px"
              }}
            >
              <Link
                onClick={() => {
                  sessionStorage.setItem(
                    "HtscrollPosition",
                    window.pageYOffset
                  );
                }}
                to={val.url_key}
              >
                <Image
                  // style={{ width: "97%" }}
                  src={val.image}
                  alt="IndoorFountain"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ShopByCollection;
