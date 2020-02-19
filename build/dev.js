import baseConfig from '.';
import merge from 'webpack-merge';
import {
  configs,
  inputs,
  outputs,
  loaders,
  plugins
} from '@feizheng/webpack-lib-kits';

export default merge(baseConfig, {
  entry: inputs.docs(),
  output: outputs.dev(),
  devtool: configs.devtool(),
  devServer: configs.devServer({
    proxy: {
      '/api': {
        target: 'https://api.github.com/',
        changeOrigin: true,
        pathRewrite: { '^/api/': '/' }
      }
    }
  }),
  plugins: [plugins.html()]
});
