/**
 * Created by oleg on 07.09.15.
 */

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();
var compiler = webpack(config);

const DEV_PORT = '8888';

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: { colors: true },
}));

app.use(webpackHotMiddleware(compiler));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

app.listen(DEV_PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + DEV_PORT);
});
