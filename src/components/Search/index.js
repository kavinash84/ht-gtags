import React from 'react';
import Input from 'hometown-components/lib/Input';
import Button from 'hometown-components/lib/Buttons';
import Div from 'hometown-components/lib/Div';

const styles = require('./Search.scss');
const SearchIcon = require('../../../static/search.jpg');
const CloseIcon = require('../../../static/close.jpg');

const Search = () => (
  <Div className={styles.search} pt="0.625rem" pb="0.625rem">
    <Input
      type="text"
      placeholder="Search"
      backgroundColor="rgba(0, 0, 0, 0.05)"
      borderColor="rgba(0, 0, 0, 0.03)"
      height="2.5rem"
    />
    <img src={SearchIcon} className={styles.searchIcon} alt="Search" />
    <Button className={styles.closeBtn} btnType="custom" bg="transparent" border="none" p="0">
      <img src={CloseIcon} alt="Close" />
    </Button>
    <Div className={`${styles.searchList} ${styles.active}`}>
      <ul>
        <li>
          <a href="#prod 1">Product 1</a>
        </li>
        <li>
          <a href="#prod 2">Product 2</a>
        </li>
        <li>
          <a href="#prod 3">Product 3</a>
        </li>
        <li>
          <a href="#prod 4">Product 4</a>
        </li>
        <li>
          <a href="#prod 5">Product 5</a>
        </li>
        <li>
          <a href="#prod 6">Product 6</a>
        </li>
        <li>
          <a href="#prod 7">Product 7</a>
        </li>
      </ul>
    </Div>
  </Div>
);

export default Search;
