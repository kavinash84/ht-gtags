import React, { Component } from 'react';
import MyMenu from 'newComponents/MyMenu';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import CardHtV1 from 'hometown-components-dev/lib/CardHtV1';
import ColHtV1 from 'hometown-components-dev/lib/ColHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';

const EditProfileIcon = require('../../../static/editIconTwo.svg');
const ordersIcon = require('../../../static/orders.png');
const favouriteIcon = require('../../../static/favourite.svg');
const shoppingCartIcon = require('../../../static/shoppingCart.svg');
const groupIcon = require('../../../static/group.svg');
const creditCardIcon = require('../../../static/creditCard.svg');
const descriptionIcon = require('../../../static/description.svg');

class MyDashBoardContainer extends Component {
  render() {
    return (
      <BoxHtV1 type="block" margin="32px" width="564px">
        <MyMenu page="address" />
        <RowHtV1
          py={20}
          sx={{
        borderBottom: 'divider'
      }}>
          <BoxHtV1 sx={{
            width: '108px',
            height: '108px',
            borderRadius: '8px',
            backgroundColor: '#595858',
            marginRight: '34px',
          }}
          />
          <ColHtV1>
            <LabelHtV1 mb={7} fontSize="18px" fontWeight="bold" variant="profileDashBoard">
              Matthew xyz
            </LabelHtV1>
            <LabelHtV1 mb={7} fontSize="17px" fontWeight="300"variant="profileDashBoard">
            matthew.xyz@gmail.com
            </LabelHtV1>
            <LabelHtV1 mb={7} fontSize="17px" fontWeight="300" variant="profileDashBoard">
            +91974209765
            </LabelHtV1>
          </ColHtV1>
          <Image
            src={EditProfileIcon}
            width="34px"
            height="34px"
            alt="profileEdit"
          />
        </RowHtV1>
        <RowHtV1>
          <CardHtV1 variant="card.rectangle" mt={32} display="flex" justifyContent="center" flexDirection="column">
            <Image
              src={ordersIcon}
              width="45px"
              height="42px"
              mt={10}
              alt="orders"
            />
            <LabelHtV1 mt={11} mb={3} fontSize="15px" fontWeight="bold" variant="profileDashBoard" flexDirection="column">
              Orders
            </LabelHtV1>
            <LabelHtV1 fontSize="12px" fontWeight="100" variant="profileDashBoard" flexDirection="column">
            Check your order status
            </LabelHtV1>
          </CardHtV1>
          <CardHtV1 variant="card.rectangle" mt={32} display="flex" justifyContent="center" flexDirection="column">
            <Image
              src={favouriteIcon}
              width="42px"
              height="37px"
              mt={10}
              alt="wishlist"
            />
            <LabelHtV1 mt={11} mb={3} fontSize="15px" fontWeight="bold" variant="profileDashBoard" flexDirection="column">
            Wishlist
            </LabelHtV1>
            <LabelHtV1 fontSize="12px" fontWeight="100" variant="profileDashBoard" flexDirection="column">
            Check saved for later items
            </LabelHtV1>
          </CardHtV1>
          <CardHtV1 variant="card.rectangle" mt={32} display="flex" justifyContent="center" flexDirection="column">
            <Image
              src={shoppingCartIcon}
              width="40px"
              height="40px"
              mt={10}
              alt="shoppingCart"
            />
            <LabelHtV1 mt={11} mb={3} fontSize="15px" fontWeight="bold" variant="profileDashBoard" flexDirection="column">
            Cart
            </LabelHtV1>
            <LabelHtV1 fontSize="12px" fontWeight="100" variant="profileDashBoard" flexDirection="column">
            Check your shopping cart
            </LabelHtV1>
          </CardHtV1>
          <CardHtV1 variant="card.rectangle" mt={32} display="flex" justifyContent="center" flexDirection="column">
            <Image
              src={groupIcon}
              width="52px"
              height="52px"
              mt={10}
              alt="coupons"
            />
            <LabelHtV1 mt={11} mb={3} fontSize="15px" fontWeight="bold" variant="profileDashBoard" flexDirection="column">
            Coupons
            </LabelHtV1>
            <LabelHtV1 fontSize="12px" fontWeight="100" variant="profileDashBoard" flexDirection="column">
            Check available coupons
            </LabelHtV1>
          </CardHtV1>
          <CardHtV1 variant="card.rectangle" mt={32} display="flex" justifyContent="center" flexDirection="column">
            <Image
              src={creditCardIcon}
              width="46px"
              height="37px"
              mt={10}
              alt="savedCards"
            />
            <LabelHtV1 mt={11} mb={3} fontSize="15px" fontWeight="bold" variant="profileDashBoard" flexDirection="column">
            Saved Cards
            </LabelHtV1>
            <LabelHtV1 fontSize="12px" fontWeight="100" variant="profileDashBoard" flexDirection="column">
            Check saved for later items
            </LabelHtV1>
          </CardHtV1>
          <CardHtV1 variant="card.rectangle" mt={32} display="flex" justifyContent="center" flexDirection="column">
            <Image
              src={descriptionIcon}
              width="31px"
              height="39px"
              mt={10}
              alt="profileDetails"
            />
            <LabelHtV1 mt={11} mb={3} fontSize="15px" fontWeight="bold" variant="profileDashBoard" flexDirection="column">
            Profile Details
            </LabelHtV1>
            <LabelHtV1 fontSize="12px" fontWeight="100" variant="profileDashBoard" flexDirection="column">
            Update your profile details
            </LabelHtV1>
          </CardHtV1>
        </RowHtV1>
      </BoxHtV1>
    );
  }
}

export default MyDashBoardContainer;
