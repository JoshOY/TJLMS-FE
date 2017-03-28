import path from 'path';
import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

import {
  jsLoader,
  jsonLoader,
  eslintLoader,
  projectStyleSCSSsheetLoader,
  projectStyleSASSsheetLoader,
  projectStyleLESSsheetLoader,
  vendorsStylesheetLoader,
  fontsAndImagesLoader,
  extractProjectCSS,
  extractVendorCSS,
} from './loaders';

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const prjRoot = p => path.resolve(__dirname, '../', p);

const htmlPluginConfig = {
  inject: false,
  title: 'TJLMS',
  template: 'src/view/index.ejs',
  meta: [
    {
      name: 'description',
      content: 'Tongji SSE learning management system.',
    },
  ],
  mobile: true,
  links: [],
  appMountId: 'app-root',
};

export default function (env) {
  const isProduction = (env === 'production');
  return {
    /* entry */
    entry: {
      main: prjRoot('src/entry/index.jsx'),
    },
    /* output */
    output: {
      filename: '[name].js?[chunkhash]',
      path: isProduction ? prjRoot('dist') : prjRoot('devbuild'),
      publicPath: isProduction ? '/static/' : '/static/',
      chunkFilename: '[name].chunk.js?[chunkhash]',
    },
    /* module */
    module: {
      rules: [
        eslintLoader(),
        jsLoader(),
        jsonLoader(),
        projectStyleSCSSsheetLoader(),
        projectStyleSASSsheetLoader(),
        projectStyleLESSsheetLoader(),
        vendorsStylesheetLoader(),
        fontsAndImagesLoader(),
      ],
    },
    /* resolve */
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        src: prjRoot('src'),
      },
    },
    /* plugins */
    plugins: [
      new HtmlPlugin({
        ...htmlPluginConfig,
        dev: (!isProduction),
      }),
      new CommonsChunkPlugin({
        // Specify the common bundle's name.
        names: ['vendor'],
        // this assumes your vendor imports exist in the node_modules directory
        minChunks: function (module) {
          return module.context && module.context.indexOf('node_modules') !== -1;
        },
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: prjRoot('.'),
          postcss: [require('autoprefixer')],
        },
      }),
      new LodashModuleReplacementPlugin({
        collections: true,
        paths: true,
      }),
      extractProjectCSS,
      extractVendorCSS,
    ],
    /* END OF CONFIG */
  };
}
