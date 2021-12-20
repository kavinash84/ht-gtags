import React from 'react';
import { Link } from 'react-router-dom';

const BannerImage = ({ src, alt, url_key }) => {
  return (
    <div style={{ marginTop:"80px" }}>
      <Link to={url_key}>
        <img src={src} alt={alt} style={{ width: '100%' }} />
      </Link>
    </div>
  );
};

export default BannerImage;