/**
 * Created by Oleg Orlov on 07.09.15.
 */

var _ = require('lodash');
var _configs = {

  //global section
  global: require(__dirname + '/config/webpack/global'),

  //config by enviroments
  production: require(__dirname + '/config/webpack/environments/production'),
  development: require(__dirname + '/config/webpack/environments/development')
};

var _mergeConfig = function(baseConfig, envConfig) {
  return _.merge(baseConfig, envConfig, function(a, b) {
    if (_.isArray(a)) {
      return a.concat(b);
    }
  });
}

var _load = function(enviroment) {

  //check enviroment
  if (!enviroment) throw 'Can\'t find local enviroment variable via process.env.NODE_ENV';
  if (!_configs[enviroment]) throw 'Can\'t find enviroments see _congigs object';

  //load config file by enviroment
  return _configs && _mergeConfig(
      _configs['global'](__dirname),
      _configs[enviroment](__dirname)
    );
};

module.exports = _load(process.env.NODE_ENV || 'development');
