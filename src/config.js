const ver = require("../package.json").version;

const environment = {
  development: {
    isProduction: false,
    assetsPath: `http://${process.env.HOST || "localhost"}:${+process.env.PORT +
      1 || 3001}/dist/`
  },
  production: {
    isProduction: true,
    assetsPath: `/dist/${ver}`
  }
}[process.env.NODE_ENV || "development"];

module.exports = Object.assign(
  {
    host: process.env.HOST || "localhost",
    port: process.env.PORT,
    apiHost: process.env.APIHOST || "localhost",
    apiPort: process.env.APIPORT,
    app: {
      title: "HomeTown",
      description: "Buy Furniture, Homeware Online",
      head: {
        titleTemplate: "%s",
        meta: [
          {
            name: "description",
            content: "Buy Furniture, HomeDecor, Online !"
          },
          { charset: "utf-8" },
          { property: "og:site_name", content: "HomeTown" },
          {
            property: "og:image",
            content:
              "https://static.hometown.in/images/local_v2/icons/homeTown_logo.png"
          },
          { property: "og:locale", content: "en_US" },
          { property: "og:title", content: "HomeTown.in" },
          {
            property: "og:description",
            content: "Buy Furniture, Homeware Online"
          },
          { property: "og:card", content: "summary" },
          { property: "og:site", content: "hometown" },
          { property: "fb:app_id", content: "987405118075400" },
          { property: "og:creator", content: "HomeTown-Tech" },
          { property: "og:image:width", content: "200" },
          { property: "og:image:height", content: "200" }
        ]
        // link: [{ rel: 'alternate', media: 'only screen and (max-width:640px)', href: 'https://m.hometown.in' }]
      }
    }
  },
  environment
);
