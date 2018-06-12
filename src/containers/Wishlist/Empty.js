import React from 'react';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

const WishListIcon = require('../../../static/wishlist-empty.jpg');

const EmptyContainer = () => (
  <div>
    <Menu filter search />
    <div className="wrapper">
      <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
        <Empty title="No items yet !!" subTitle="Add items to it" btnName="Continue Shopping" url="/" bg="#fafafa">
          <Img src={WishListIcon} width="initial" m="auto" alt="No items yet !!" />
        </Empty>
      </Section>
    </div>
    <Footer />
  </div>
);

export default EmptyContainer;
