import React from 'react';
import { Link } from 'react-router-dom';

const styles = require('./BreadCrumb.scss');

const BreadCrumb = () => (
  <ul className={styles.breadCrumbList}>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/">Furniture</Link>
    </li>
  </ul>
);

export default BreadCrumb;
