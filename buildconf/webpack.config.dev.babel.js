import baseConfigFn from './webpack.config.base.babel';

const config = baseConfigFn('debug');

config.devtool = 'cheap-module-eval-source-map';

export default config;
