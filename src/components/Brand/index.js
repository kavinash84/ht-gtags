/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import BannerImageLeft from '../../../static/collection/1.jpg';
import BannerImageRight from '../../../static/collection/2.jpg';
import BannerImageCenter from '../../../static/collection/LA-mid-banner.jpg';

import beds from '../../../static/categories/beds.jpg';
import Coffeetables from '../../../static/categories/Coffeetables.jpg';
import Sideboards from '../../../static/categories/Sideboards.jpg';
import Wardrobes from '../../../static/categories/Wardrobes.jpg';
import Tableware from '../../../static/categories/Tableware.jpg';
import Fragrances from '../../../static/categories/Fragrances.jpg';
import DiningSet from '../../../static/categories/dining-set.jpg';
import Sofas from '../../../static/categories/Sofas.jpg';

import ProvenCale from '../../../static/collection/Provencale.jpg';
import Milton from '../../../static/collection/Milton.jpg';
import Henshaw from '../../../static/collection/Henshaw.jpg';
import Garrat from '../../../static/collection/Garrot.jpg';
import Keats from '../../../static/collection/Keats.jpg';
import Dorset from '../../../static/collection/Dorset.jpg';
import BrandLogo from '../../../static/collection/LA-logo.jpg';

import BrandCollection from './BrandCollection';
import BrandCategories from './BrandCategories';

const styles = require('./lauraAshley.scss');

class Brand extends React.Component {
  state = {
    bannerImageLeft: BannerImageLeft,
    bannerImageRight: BannerImageRight,
    bannerImageCenter: BannerImageCenter,
    brandLogo: BrandLogo,
    CollectionData: [
      {
        content: 'Provencale',
        title:
          'A French country style range which looks great as a collection or used as individual pieces. Carefully constructed by skilled craftsmen and finished by hand.',
        imgUrl: ProvenCale,
        url: '/furniture/laura-ashley/shop-by-collection/provencale'
      },
      {
        content: 'Milton',
        title:
          'Milton has a pure and timeless quality that makes it suitable for almost any living space. Made using traditional joints and craftsmenship, each piece is beautifully enhanced by a fine, oiled finish and antiqued pewter effect handles',
        imgUrl: Milton,
        url: '/furniture/laura-ashley/shop-by-collection/milton'
      },
      {
        content: 'Henshaw',
        title:
          'Add drama to any room with Henshaw, featuring a hand-painted black finish and distressed edges rubbed back to reveal a golden colour beneath',
        imgUrl: Henshaw,
        url: '/furniture/laura-ashley/shop-by-collection/henshaw'
      },
      {
        content: 'Garrat',
        title:
          'Available in dark chestnut and honey, our ever popular Garrat range is stained to enhance the natural wood features, grain and colour variation. With antiqued brass effect handles and knobs, it will suit any home',
        imgUrl: Garrat,
        url: '/furniture/laura-ashley/shop-by-collection/garrat'
      },
      {
        content: 'Keats',
        title:
          'The perfect balance between elegant design and traditional cabinet making, our Keats collection combines soft curves together with subtle features and details that are a true sign of quality construction',
        imgUrl: Keats,
        url: '/furniture/laura-ashley/shop-by-collection/keats'
      },
      {
        content: 'Dorset',
        title:
          'Classically elegant, this hand finished range features a gentle chalky finish that works perfectly with the ash tops, whilst contrast steel effect handles and hinges introduce a contemporary twist',
        imgUrl: Dorset,
        url: '/furniture/laura-ashley/shop-by-collection/dorset'
      }
    ],
    brandCategories: [
      {
        image_url: Sofas,
        name: 'Sofas',
        url: '/furniture/laura-ashley/laura-ashley-sofas'
      },
      {
        image_url: DiningSet,
        name: 'Dining Sets',
        url: '/furniture/laura-ashley/laura-ashley-dining-sets'
      },
      {
        image_url: beds,
        name: 'Beds',
        url: '/furniture/laura-ashley/laura-ashley-beds'
      },
      {
        image_url: Coffeetables,
        name: 'Coffee Tables & End Tables',
        url: '/furniture/laura-ashley/LA-Coffee-tables-and-end-tables-Laura-Ashley'
      },
      {
        image_url: Sideboards,
        name: 'Side Boards and Consoles',
        url: '/furniture/laura-ashley/sideboard-and-consoles'
      },
      {
        image_url: Wardrobes,
        name: 'Wardrobe & Night Stands',
        url: '/furniture/laura-ashley/wardrobe-and-nightstand'
      },
      {
        image_url: Tableware,
        name: 'Tableware',
        url: '/furniture/laura-ashley/Laura-Ashley-tableware'
      },
      {
        image_url: Fragrances,
        name: 'Fragrances',
        url: '/furniture/laura-ashley/fragrances'
      }
    ]
  };
  render() {
    const {
      brandCategories,
      bannerImageLeft,
      bannerImageRight,
      bannerImageCenter,
      CollectionData,
      brandLogo
    } = this.state;
    return (
      <Box>
        <Box>
          <Row>
            <Box variant="col-6" pr={5} pl={0}>
              <Image src={bannerImageLeft} alt="" sx={{ width: '100%' }} />
            </Box>
            <Box variant="col-6" pr={0} pl={0}>
              <Image src={bannerImageRight} alt="" sx={{ width: '100%' }} />
            </Box>
            <Box
              mb={'-130px'}
              sx={{
                position: 'relative',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70%'
              }}
            >
              <Box pl={0} pr={0} mt={30} className={styles.brandCollection}>
                {/* <Text textAlign="center" fontSize={60} mb={20}>
                  LAURA ASHLEY
                </Text>
                <Text textAlign="center" fontSize={30} mb={20}>
                  HOME
                </Text> */}
                <Image src={brandLogo} alt="" sx={{ width: '100%', marginBottom: '10px' }} />
                <Text textAlign="center" fontSize={20} lineHeight={1.4} sx={{ letterSpacing: '0.1em' }}>
                  Discover our stunning collection from Laura Ashley, the quintessential British brand. <br />
                  With ornate detailing, plush textures, sophisticated styles, timeless designs <br />
                  and rich colourways, this luxurious collection ensures your home <br />
                  displays an extension of your personality.
                </Text>
              </Box>
            </Box>
          </Row>
        </Box>
        <Box sx={{ width: '90%' }} mx="auto">
          <Image src={bannerImageCenter} alt="" sx={{ width: '100%' }} />
        </Box>

        <Box>
          <Heading textAlign="center" fontSize={30} color="#474747" mb={0} my={50}>
            {' '}
            SHOP BY CATEGORY{' '}
          </Heading>
        </Box>
        <Box mb={40}>
          <Box ml={25} mr={25} pr={0} pl={0} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <BrandCategories brandCategories={brandCategories} />
          </Box>
        </Box>
        <Box my={50} textAlign="center">
          <Heading fontSize={30} color="#474747" mb={0}>
            {' '}
            SHOP OUR COLLECTIONS{' '}
          </Heading>
        </Box>
        <Box mb={20}>
          <BrandCollection CollectionData={CollectionData} />
        </Box>
        <Box sx={{ backgroundColor: '#F6F6F6' }}>
          <Text textAlign="center" fontSize={24} pt={40} pb={10} color={'#a4b9c8'} letterSpacing={'0.1em'}>
            ABOUT LAURA ASHLEY
          </Text>
          <Text textAlign="center" p="30px" ml={40} mr={40} pt={10} lineHeight={1.4} fontSize={24}>
            Laura Ashley is a quintessentially English lifestyle brand founded in 1954 by Bernard Ashley and his wife
            Laura Ashley. The brand prides itself on its rich design heritage and traditional values of quality and
            originality. Each piece is an inspiration in itself and the prints, designs and colours which feature in
            every Laura Ashley collection evoke the alluring beauty of the English countryside, for the way you live
            today.
          </Text>
        </Box>
      </Box>
    );
  }
}

export default connect(null)(Brand);
