const environment = {
  development: {
    isProduction: false,
    assetsPath: `http://${process.env.HOST || 'localhost'}:${+process.env.PORT + 1 || 3001}/dist/`
  },
  production: {
    isProduction: true,
    assetsPath: '/dist/'
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    app: {
      title: 'HomeTown',
      description: 'Buy Furniture, Homeware Online',
      head: {
        titleTemplate: 'HomeTown: %s',
        meta: [
          { name: 'description', content: 'Buy Furniture Online !' },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: 'HomeTown' },
          { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
          { property: 'og:locale', content: 'en_US' },
          { property: 'og:title', content: 'HomeTown.in' },
          { property: 'og:description', content: 'Buy Furniture, Homeware Online' },
          { property: 'og:card', content: 'summary' },
          { property: 'og:site', content: 'hometown' },
          { property: 'og:creator', content: 'ramakrishna' },
          { property: 'og:image:width', content: '200' },
          { property: 'og:image:height', content: '200' }
        ]
      }
    }
  },
  environment
);
