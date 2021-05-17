const listingBestOffers = [
  {
    '/hot-deals/furniture-deals': {
      images: [
        {
          id: 1,
          title: 'Best Offers',
          description: 'Best Offers',
          image: require('../../static/campaign/best-offers-05.jpeg'),
          type: 'webview_layout',
          meta: { name: 'Best Offers', id: 'Best Offers' }
        }
      ]
    },
    '/hot-deals': {
      images: [
        {
          id: 1,
          title: 'Best Offers',
          description: 'Best Offers',
          image: require('../../static/campaign/best-offers-05.jpeg'),
          type: 'webview_layout',
          meta: { name: 'Best Offers', id: 'Best Offers' }
        }
      ]
    },
    '/home-furnishings/mothers-day': {
      images: [
        {
          id: 1,
          title: 'Best Offers',
          description: 'Best Offers',
          image: require('../../static/campaign/best-offers-01.jpeg'),
          type: 'webview_layout',
          meta: { name: 'Best Offers', id: 'Best Offers' }
        },
        {
          id: 2,
          title: 'Best Offers',
          description: 'Best Offers',
          image: require('../../static/campaign/best-offers-02.jpeg'),
          type: 'webview_layout',
          meta: { name: 'Best Offers', id: 'Best Offers' }
        },
        {
          id: 3,
          title: 'Best Offers',
          description: 'Best Offers',
          image: require('../../static/campaign/best-offers-03.jpeg'),
          type: 'webview_layout',
          meta: { name: 'Best Offers', id: 'Best Offers' }
        },
        {
          id: 4,
          title: 'Best Offers',
          description: 'Best Offers',
          image: require('../../static/campaign/best-offers-04.jpeg'),
          type: 'webview_layout',
          meta: { name: 'Best Offers', id: 'Best Offers' }
        }
      ]
    }
  }
];

const listingBestOffersPath = ['/hot-deals/furniture-deals', '/hot-deals', '/home-furnishings/special-offer'];
export default { listingBestOffers, listingBestOffersPath };
