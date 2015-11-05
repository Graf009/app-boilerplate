/*
* @Author: Oleg Orlov
* @Date:   2015-07-27 15:17:19
*/

if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
  module.exports = require('./configureStore.dev');
} else {
  module.exports = require('./configureStore.prod');
}
