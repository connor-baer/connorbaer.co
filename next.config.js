/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const slug = require('rehype-slug');
const emoji = require('remark-emoji');
const externalLinks = require('remark-external-links');
const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline');
const withTM = require('@weco/next-plugin-transpile-modules');
const withMDX = require('@zeit/next-mdx')({
  extension: /.mdx?$/,
  options: {
    mdPlugins: [emoji, externalLinks],
    hastPlugins: [slug]
  }
});

const {
  CONTENTFUL_SPACE,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_HOST,
  CONTENTFUL_ENVIRONMENT
} = process.env;

const PORT = process.env.PORT || 8080;
const LOCALHOST = `http://localhost:${PORT}`;
const BASE_URL = process.env.BASE_URL || LOCALHOST;
const STATIC_URL = process.env.STATIC_URL || `${LOCALHOST}/static`;

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'md'],
  poweredByHeader: false,
  publicRuntimeConfig: {
    BASE_URL,
    STATIC_URL,
    CONTENTFUL_SPACE,
    CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_HOST,
    CONTENTFUL_ENVIRONMENT
  },
  webpack: (config, { dev }) => {
    const originalEntry = config.entry;
    // eslint-disable-next-line no-param-reassign
    config.entry = async () => {
      const entries = await originalEntry();
      if (entries['main.js']) {
        entries['main.js'].unshift('./scripts/polyfills.js');
      }
      return entries;
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        { loader: 'babel-loader' },
        {
          loader: 'react-svg-loader',
          options: {
            es5: true
          }
        }
      ]
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(dev),
        __PRODUCTION__: JSON.stringify(!dev),
        __TEST__: false
      })
    );

    if (process.env.ANALYZE) {
      // eslint-disable-next-line global-require
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true
        })
      );
    }

    return config;
  }
};

module.exports = withPlugins(
  [
    withOffline,
    withMDX,
    [
      withTM,
      {
        transpileModules: ['@sumup/circuit-ui']
      }
    ]
  ],
  nextConfig
);
