import React from 'react';

// import BoxHtV1 from "hometown-components-dev/lib/Div";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';

import './DealsOfTheDay.css';

const dealsoftheday01 = require('../../../static/new-home/dealsoftheday01.png');

const DealsOfTheDayCards = () => (
  <div className="wrapper">
    <HeadingHtV1
      fontFamily="medium"
      style={{ textAlign: 'center', color: '#323131' }}
      fontSize="22px"
      mt="25px"
      mb="10px"
    >
      Deals Of The day
    </HeadingHtV1>
    <RowHtV1 justifyContent="center" mx={0} mb={0} />
    <div
      style={{
          width: '30px',
          borderTop: '2px solid #222222',
          margin: 'auto'
        }}
    />
    {/* <Link to={to}> */}
    <div className="card-wrapper">
      <div className="card">
        <img src={dealsoftheday01} m={5} height="auto" width="90%" style={{ zIndex: 10 }} />
        {/* <p className="deal-end-tag">Ends Today</p> */}
        <h3 className="card-title">Bolton Engineered wood King bed with Box storge in wenge colou....</h3>
        <p className="Para-one">By Hometown</p>
        <p className="price">
          Price: &#8377;16,9999
          <span className="price-discount">&#8377;28,500</span>
          <span className="price-off">30% off</span>
        </p>
        <p className="discount">
          Use: <span className="discount-new">NEW 15</span> to get extra 15% OFF
        </p>
        <p className="button">SHOP NOW</p>
      </div>
      <div className="card">
        <img src={dealsoftheday01} m={5} height="auto" width="90%" style={{ zIndex: 10 }} />

        <h3 className="card-title">Bolton Engineered wood King bed with Box storge in wenge colou....</h3>
        <p className="Para-one">By Hometown</p>
        <p className="price">
          Price: &#8377;16,9999
          <span className="price-discount">&#8377;28,500</span>
          <span className="price-off">30% off</span>
        </p>
        <p className="discount">
          Use: <span className="discount-new">NEW 15</span> to get extra 15% OFF
        </p>
        <p className="button">SHOP NOW</p>
      </div>
      <div className="card">
        <img src={dealsoftheday01} m={5} height="auto" width="90%" style={{ zIndex: 10 }} />

        <h3 className="card-title">Bolton Engineered wood King bed with Box storge in wenge colou....</h3>
        <p className="Para-one">By Hometown</p>
        <p className="price">
          Price: &#8377;16,9999
          <span className="price-discount">&#8377;28,500</span>
          <span className="price-off">30% off</span>
        </p>
        <p className="discount">
          Use: <span className="discount-new">NEW 15</span> to get extra 15% OFF
        </p>
        <p className="button">SHOP NOW</p>
      </div>
    </div>
    {/* </Link> */}
  </div>
  );

export default DealsOfTheDayCards;
