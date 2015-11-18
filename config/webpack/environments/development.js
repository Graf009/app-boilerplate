/*
* @Author: Oleg Orlov
* @Date:   2015-09-07 15:17:19
*/

import path from 'path';
import webpack from 'webpack';

export default function(_path) {
  const rootAssetPath = path.join(_path, 'public');
  const rootSourcePath = path.join(_path, 'src');

  const FILE_LOADER_STRING = `file?context=${rootAssetPath}&name=assets/static/[ext]/[name].[hash:6].[ext]`;

  return {
    context: _path,
    debug: true,
    devtool: 'inline-source-map',
    entry: {
      application: [
        'webpack-hot-middleware/client',
        rootSourcePath,
      ],
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel', include: rootSourcePath },
        { test: /\.css$/, loader: 'style!css?importLoaders=1!postcss' },
        { test: /\.(ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i, loader: FILE_LOADER_STRING },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
}
