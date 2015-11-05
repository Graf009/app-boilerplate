/*
* @Author: Oleg Orlov
* @Date:   2015-10-28 16:07:19
*/

if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
  module.exports = require('./Root.dev');
} else {
  module.exports = require('./Root.prod');
}
