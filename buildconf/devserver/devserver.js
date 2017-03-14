// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackDevMiddleware from 'webpack-dev-middleware';

import devSettings from '../webpack.config.dev.babel';

const main = async () => {
  const app = express();
  const middlewareConfig = {
    noInfo: false,
    quiet: false,
    lazy: false,
    publicPath: '/public/',
    stats: {
      colors: true,
    },
  };
  app.use(webpackDevMiddleware(webpack(devSettings), middlewareConfig));
  app.listen(4000, () => {
    // eslint-disable-next-line import/no-console
    console.log('Webpack dev server listening on port 4000...');
  });
};

// eslint-disable-next-line import/no-console
main().catch(err => console.error(err));
