module.exports = {
  webpack: (config) => {
    config.cache = false; // Disable Webpack persistent cache
    return config;
  },
  images: {
    domains: ['utfs.io'],
  },
};
