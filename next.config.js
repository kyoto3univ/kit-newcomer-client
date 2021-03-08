module.exports = {
  trailingSlash: true,
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT || 'http://localhost:3000',
    ASSET_ENDPOINT:
      process.env.ASSET_ENDPOINT || 'http://localhost:3000/assets/',
    GA_ID: process.env.GA_ID,
  },
};
