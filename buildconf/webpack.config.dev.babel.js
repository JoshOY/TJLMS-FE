// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import baseConfigFn from './webpack.config.base.babel';

const config = baseConfigFn('debug');

config.devtool = 'cheap-module-eval-source-map';

// config.plugins.push(new BundleAnalyzerPlugin());

export default config;
