const config = require('./webpack.config.public');                
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//js压缩插件
const CleanWebpackPlugin=require('clean-webpack-plugin');
config.plugins.push(new CleanWebpackPlugin(['build']));
config.plugins.push(new UglifyJSPlugin());
module.exports = config;

