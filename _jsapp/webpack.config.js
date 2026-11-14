require('babel-core/register'); // development.jsでES6を使えるようにする

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./webpack.config.prd.js')
} else {
	module.exports = require('./webpack.config.dev.js')
}



