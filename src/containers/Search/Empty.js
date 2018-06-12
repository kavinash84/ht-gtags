import React from 'react';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

const SearchEmptyIcon = require('../../../static/search-empty.jpg');

const EmptyContainer = () => (
  <div>
    <Menu filter search />
    <div className="wrapper">
      <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
        <Empty
          title="Sorry no results found"
          subTitle="Please check the selling or by a different search"
          btnName="Search Again"
          url="/"
          bg="#fafafa"
        >
          <Img src={SearchEmptyIcon} width="initial" m="auto" alt="Sorry no results found" />
        </Empty>
      </Section>
    </div>
    <Footer />
  </div>
);

export default EmptyContainer;
