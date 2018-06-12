import React from 'react';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

const CartEmptyIcon = require('../../../static/cart-empty.jpg');

const EmptyContainer = () => (
  <div>
    <Menu filter search />
    <div className="wrapper">
      <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
        <Empty title="Your cart is currently empty!" subTitle="Add items to it" btnName="Shop Now" url="/" bg="#fafafa">
          <Img src={CartEmptyIcon} width="initial" m="auto" alt="Your cart is currently empty!" />
        </Empty>
      </Section>
    </div>
    <Footer />
  </div>
);

export default EmptyContainer;
