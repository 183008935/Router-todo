const config = require('./webpack.config.public');                
config.devServer={
    open:true,
    publicPath:"/"
};
 module.exports = config;