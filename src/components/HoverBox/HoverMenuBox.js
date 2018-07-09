import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Img from 'hometown-components/lib/Img';

const styles = require('./HoverMenuBox.scss');

const HoverMenuBox = ({
  handleEnter, handleLeave, menuData, exitOnClick
}) => (
  <div className={styles.menuBoxContainer}>
    <div className={styles.menuBox} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {menuData
        ? menuData.children.filter(menu => menu.visibility === 'on').map(subCategory1 => (
          <div key={subCategory1.id}>
            <ul className={styles.list}>
              <div className={styles.media}>
                <div className={styles.catImgWrapper}>
                  <Img src={subCategory1.category_image} alt="" />
                </div>
                <div className={styles.mediaBody}>
                  <h4>
                    <Link onClick={exitOnClick} to={`/${subCategory1.url_key}`}>
                      {subCategory1.name}
                    </Link>
                  </h4>
                  {subCategory1.children
                    ? subCategory1.children.filter(menu => menu.visibility === 'on').map(subCategory2 => (
                      <li key={subCategory2.id}>
                        <Link onClick={exitOnClick} to={`/${subCategory2.url_key}`}>
                          {subCategory2.name}
                        </Link>
                      </li>
                    ))
                    : null}
                </div>
              </div>
            </ul>
          </div>
        ))
        : null}
    </div>
  </div>
);

HoverMenuBox.defaultProps = {
  menuData: {}
};
HoverMenuBox.propTypes = {
  menuData: PropTypes.object,
  handleEnter: PropTypes.func.isRequired,
  handleLeave: PropTypes.func.isRequired,
  exitOnClick: PropTypes.func.isRequired
};

export default HoverMenuBox;
