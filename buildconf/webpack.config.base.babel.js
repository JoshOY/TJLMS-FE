import path from 'path';
import webpack from 'webpack';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

import {
  jsLoader,
  projectStyleSCSSsheetLoader,
  projectStyleSASSsheetLoader,
  vendorsStylesheetLoader,
  fontsAndImagesLoader,
  extractProjectCSS,
  extractVendorCSS,
} from './loaders';

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const prjRoot = p => path.resolve(__dirname, '../', p);

export default function (env) {
  const isProduction = (env === 'production');
  return {
    /* entry */
    entry: {
      main: prjRoot('src/entry/index.js'),
    },
    /* output */
    output: {
      filename: '[name].js?[chunkhash]',
      path: isProduction ? prjRoot('dist') : prjRoot('devbuild'),
      publicPath: '/public/',
      chunkFilename: '[name].chunk.js?[chunkhash]',
    },
    /* module */
    module: {
      rules: [
        jsLoader(),
        projectStyleSCSSsheetLoader(),
        projectStyleSASSsheetLoader(),
        vendorsStylesheetLoader(),
        fontsAndImagesLoader(),
      ],
    },
    /* resolve */
    resolve: {
      alias: {
        src: prjRoot('src'),
      },
    },
    /* plugins */
    plugins: [
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
      extractProjectCSS,
      extractVendorCSS,
    ],
    /* END OF CONFIG */
  };
}
