/*
* @Author: Oleg Orlov
* @Date:   2015-09-07 15:17:19
*/

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default function(_path) {
  const rootAssetPath = path.join(_path, 'public');
  const rootSourcePath = path.join(_path, 'src');

  const FILE_LOADER_STRING = `file?context=${rootAssetPath}&name=assets/static/[ext]/[name].[hash:6].[ext]`;
  const IMG_OPT_STRING = 'image-webpack?bypassOnDebug&optimizationLevel=7';

  return {
    context: _path,
    debug: false,
    devtool: 'source-map',
    entry: {
      application: rootSourcePath,
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel', include: rootSourcePath },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap&importLoaders=1!postcss?pack=minify') },
        { test: /\.(ttf|eot|woff|woff2|ico)$/i, loader: FILE_LOADER_STRING },
        { test: /\.(png|svg)$/i, loaders: [FILE_LOADER_STRING, `${IMG_OPT_STRING}&interlaced=true`] },
        { test: /\.(gif)$/i, loaders: [FILE_LOADER_STRING, `${IMG_OPT_STRING}&interlaced=false`] },
        { test: /\.(jpe?g)$/i, loaders: [FILE_LOADER_STRING, `${IMG_OPT_STRING}&interlaced=false&progressive=true`] },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        // This has effect on the react lib size
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false,
      }),
      new ExtractTextPlugin('assets/css/[name].[contenthash:6].css'),

      // optimizations
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
          warnings: false,
          screw_ie8: true,
        },
      }),
    ],
  };
}
