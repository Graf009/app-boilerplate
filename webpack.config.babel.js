/*
* @Author: Oleg Orlov
* @Date:   2015-09-07 15:50:19
*/

import _ from 'lodash';

// global section
import global from './config/webpack/global';

// config by enviroments
import production from './config/webpack/environments/production';
import development from './config/webpack/environments/development';

const configs = {
  global,
  production,
  development,
};

function mergeConfig(baseConfig, envConfig) {
  return _.merge(baseConfig, envConfig, (a, b) => { if (_.isArray(a)) return a.concat(b); });
}

function load(enviroment) {
  // check enviroment
  if (!enviroment) throw new Error('Can\'t find local enviroment variable via process.env.NODE_ENV');
  if (!configs[enviroment]) throw new Error('Can\'t find enviroments see _congigs object');

  // load config file by enviroment
  return configs && mergeConfig(
      configs.global(__dirname),
      configs[enviroment](__dirname)
    );
}

export default load(process.env.NODE_ENV || 'development');
