import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const prjRoot = p => path.resolve(__dirname, '../', p);

export const extractProjectCSS = new ExtractTextPlugin({
  filename: 'style.css?[sha1:contenthash:hex:10]',
  allChunks: true,
});

export const extractVendorCSS = new ExtractTextPlugin({
  filename: 'vendor.css?[sha1:contenthash:hex:10]',
  allChunks: true,
});

export const postcss = () => 'postcss-loader';

export const style = () => 'style-loader';

export const css = () => 'css-loader?importLoaders=1';

export const file = () => ({
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]?[sha1:hash:hex:10]',
  },
});

export const jsonLoader = () => ({
  test: /\.json$/,
  use: [
    {
      loader: 'json-loader',
    },
  ],
});

export const scss = () => 'sass-loader';

export const sass = () => 'sass-loader?indentedSyntax';

export const less = () => 'less-loader';

export const jsLoader = () => ({
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          'react',
          'es2015',
          'stage-0',
        ],
        plugins: [
          'syntax-dynamic-import',
          'transform-async-to-generator',
          'transform-regenerator',
          'transform-runtime',
          'react-hot-loader/babel',
          'lodash',
          [
            'import',
            {
              libraryName: 'antd',
              libraryDirectory: 'lib',
              style: 'css',
            },
          ],
        ],
      },
    },
  ],
});

export const eslintLoader = () => ({
  enforce: 'pre',
  test: /\.jsx?$/,
  exclude: /node_modules\//,
  use: [{
    loader: 'eslint-loader',
    options: {
      configFile: prjRoot('.eslintrc.yml'),
    },
  }],
});

export const vendorsStylesheetLoader = () => ({
  test: /\.css$/,
  include: /node_modules[/\\]/,
  use: extractVendorCSS.extract([css()]),
});

export const projectStyleSCSSsheetLoader = () => ({
  test: /\.scss$/,
  use: extractProjectCSS.extract([css(), postcss(), scss()]),
});

export const projectStyleLESSsheetLoader = () => ({
  test: /\.less$/,
  use: extractVendorCSS.extract([css(), postcss(), less()]),
});

export const projectStyleSASSsheetLoader = () => ({
  test: /\.sass$/,
  use: extractProjectCSS.extract([css(), postcss(), sass()]),
});

export const fontsAndImagesLoader = () => ({
  test: /\.(svg|ttf|eot|woff|woff2|png|jpg|jpeg|gif)$/,
  use: [file()],
});

export default {
  jsLoader,
  jsonLoader,
  eslintLoader,
  vendorsStylesheetLoader,
  projectStyleSCSSsheetLoader,
  projectStyleSASSsheetLoader,
  projectStyleLESSsheetLoader,
  fontsAndImagesLoader,
  extractVendorCSS,
  extractProjectCSS,
};
