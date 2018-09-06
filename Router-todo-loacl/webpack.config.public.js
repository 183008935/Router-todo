const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const webpack=require('webpack');
module.exports={
   entry:'./src/js/index.js',
   output:{
       path:path.resolve(__dirname,"build"),
       filename:'js/bundle.js'
   },
   plugins:[
       new HtmlWebpackPlugin({
           filename:"index.html",
           template:"./src/index.html",
           inject: true,
           favicon: './src/favicon.ico',
       }),
       new webpack.ProvidePlugin({
        React:'react',
        ReactDOM:'react-dom',
        PT:'prop-types'
      })
   ],
   module:{
       loaders:[
           {
             test:/\.css$/,
             loader:'style-loader!css-loader'    
           },
        //    {
        //     test:/\.(jpg|png|gif)$/,
        //     loader:'file-loader',
        //     options:{
        //         name:'img/[name]_hash.[ext]'
        //     }
        // },
           {
            test:/\.(jpg|png|gif)$/,
            loader:'url-loader',
            options:{
              limit:10000,//限制小于10000字节,进行base64编码
              name:'img/[name]_[hash].[ext]'
            }
          },
          {
            test: /\.jsx?$/,//表示要编译的文件的类型，这里要编译的是js文件
            loader: 'babel-loader',//装载的哪些模块
            exclude: /node_modules/,//标识不编译node_modules文件夹下面的内容
            // query: {//具体的编译的类型，
            //     compact: false,//表示不压缩
            //     presets: ['env','react'],//我们需要编译的是react
            //     plugins: ['transform-object-rest-spread']
            // }
        }
      
       ]
   },
   resolve:{
       extensions:['.jsx','.css','.less','.js']
   }
}