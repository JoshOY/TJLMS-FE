// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackDevMiddleware from 'webpack-dev-middleware';

import devSettings from '../webpack.config.dev.babel';

// const devbuildRoot = '';

const main = async () => {
  const app = express();
  const middlewareConfig = {
    noInfo: false,
    quiet: false,
    lazy: false,
    publicPath: '/',
    index: 'index.html',
    stats: {
      colors: true,
    },
  };
  /*
  app.route('/static/:filePath').get((req, res) => {
    res.sendFile(`static/${req.params.filePath}`);
  });
  */
  app.use(webpackDevMiddleware(webpack(devSettings), middlewareConfig));
  app.listen(4000, () => {
    // eslint-disable-next-line no-console
    console.log('Webpack dev server listening on port 4000...');
  });
};

// eslint-disable-next-line no-console
main().catch(err => console.error(err));
