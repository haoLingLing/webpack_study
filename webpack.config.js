const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('css/[name]-css.css');
const extractSASS = new ExtractTextPlugin('css/[name]-sass.css');
const webpack=require("webpack")
//构建前删除dist目录 每次build 后dist 下的目录重新打包
const CleanWebpackPlugin = require('clean-webpack-plugin');


console.log(11111111111111111, __dirname);
module.exports = {
    // 多页面入口
    entry: {
        index: './src/js/index.js',//入口JS
        mian: './src/js/main.js',//入口JS
    },
    output: {
        // filename: 'bundle.js',
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    devServer: {
        port: 8866,
        historyApiFallback: true,// 当我们搭建单页面的时候使用，任意的跳转或404 响应可以指向index.html
        compress:true,
        hot:true,
        contentBase: path.join(__dirname, './src'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract(
                    {
                        use: "css-loader",
                        fallback: "style-loader",
                        // publicPath:'../'
                    })
            },
            {
                test: /\.scss$/,
                use: extractSASS.extract(
                    {
                        use: [{loader: "css-loader"}, {loader: "sass-loader"}],
                        fallback: "style-loader"
                    })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader', options: {
                        cacheDirectory: true//缓存
                    }
                }
            },
            {
                test: /\.json$/,
                use: [{
                    loader: 'json-loader',
                }],

            },
            {
                // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
                test: /\.(woff|woff2|eot|otf|ttf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8192,  //小于8KB,就base64编码
                        name: 'font/[name].[hash].[ext]',     //在哪里生成
                        publicPath: '../'    //在生成的文件引用,前面加
                    }
                }]
            },
            { //打包css里的图片
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        // loader: 'file-loader',
                        options: {
                            limit: 8192,  //小于8KB,就base64编码
                            name: 'img/[name].[ext]',     //在哪里生成
                            publicPath: '../../'    //在生成的文件引用,前面加
                        }
                    },
                    // {    //压缩图片要在file-loader之后使用
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         bypassOnDebug: true
                    //     }
                    // }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]',
                    publicPath: '../../'
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src'],
                        minimize:true,
                        interpolate:require
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',// 模板文件
            filename: 'index.html'
        }),
        /* new HtmlWebpackPlugin({
             filename : 'main.html',//输出的html路径
             template : 'index.html', //html模板路径
             //inject : 'head',  //js文件在head中，若为body则在body中
             inject : true,
             title : 'this is main.html',
             date : new Date(),/!*,
              minify : {
              removeComments : true, //打包后删除参数
              collapseWhitespace : true //打包后删除空格
              }*!/
             // chunks : ['b'],
         }),*/
        /*new CopyWebpackPlugin([{
            from: './src/img',
            to: './img'
        }]),*/
        new CopyWebpackPlugin([{
            from: './src/json',
            to: './json'
        }]),
        // new webpack.HotModuleReplacementPlugin(),
        extractCSS,
        extractSASS,
        new CleanWebpackPlugin(
            ['dist', 'build'],
            {
                verbose: false, exclude: ['img']//不删除img静态资源
            },
            {
                verbose: false, exclude: ['font']//不删除font
            },
        )
    ]
};