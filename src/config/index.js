/*
* @Author: Oleg Orlov
* @Date:   2015-09-10 18:03:47
*/

const configName = `./environments/${__APP_CONFIG__}`;
const config = require(`./environments/${__APP_CONFIG__}`);
const { api } = config;

if (typeof api !== 'object') throw new Error(`Specify a object api in config (${configName}).`);
if (typeof api.host !== 'string') throw new Error(`Specify a string api.host in config (${configName}).`);
if (typeof api.port !== 'string') throw new Error(`Specify a string api.port in config (${configName}).`);
if (typeof api.version !== 'string') throw new Error(`Specify a string api.version in config (${configName}).`);

export default config;
