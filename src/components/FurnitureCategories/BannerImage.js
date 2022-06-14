import React from 'react';
import { Link } from 'react-router-dom';

const BannerImage = ({ src, alt, url_key }) => {
  return (
    <div style={{ marginTop:"80px" }}>
      <Link to={url_key}>
        <img data-src={src} src={`${src}?blur=30`} alt={alt} style={{ width: '100%' }} />
      </Link>
    </div>
  );
};

export default BannerImage;