/*
* @Author: Oleg Orlov
* @Date:   2015-09-07 15:50:19
*/

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import history from 'connect-history-api-fallback';

import config from '../webpack.config.babel';

const app = express();
const compiler = webpack(config);

const DEV_PORT = '8888';

app.use(history());

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: { colors: true },
}));

app.use(webpackHotMiddleware(compiler));

app.listen(DEV_PORT, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + DEV_PORT);
});
