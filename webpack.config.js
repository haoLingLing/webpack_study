const path = require('path');
//处理html 模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
// copy 文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// css单独打包
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCss = new ExtractTextPlugin('css/[name].css');

//构建前删除dist目录 每次build 后dist 下的目录重新打包
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // 多页面入口
    entry: {
        index: './src/js/index.js',//入口JS
        pageOne: './src/js/pageOne.js',//第一页
        // pageTwo: './src/js/pageTwo.js',//第二页
    },
    output: {
        // filename: 'bundle.js',
        filename: '[name].js',
        path: path.resolve(__dirname, './dist/'),
        // publicPath: './dist/'
    },
    devServer: {
        port: 8866,
        historyApiFallback: true,// 当我们搭建单页面的时候使用，任意的跳转或404 响应可以指向index.html
        compress: true,
        // hot:true
        contentBase: path.join(__dirname, './src'),
    },
    module: {
        // test 属性标知哪些文件或文件应该被转换
        // use 属性指示应该使用哪个加载程序进行装换
        rules: [
            {
                test: /\.css|scss$/,
                use: extractCss.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                // url:false,
                                minimize: true,//启用和压缩
                                sourceMap: true
                            }
                        },
                        // {loader: "sass-loader"}
                    ],
                    // publicPath:"../"
                })
            },
             /*{
                 test: /\.scss$/,
                 use: extractSASS.extract(
                     {
                         use: [{loader: "css-loader"}, {loader: "sass-loader"}],
                         fallback: "style-loader"
                     })
             },*/
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true//缓存
                    }
                }]
            },
            {
                test: /\.json$/,
                use: [{
                    loader: 'json-loader',
                    options: {
                        publicPath: '../'    //在生成的文件引用,前面加
                    }
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
                            name: 'img/[name].[hash].[ext]',     //在哪里生成
                            publicPath: '../'    //在生成的文件引用,前面加  为了解决css 中的背景图片
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[ext]',
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        interpolate: require,
                        // root: path.resolve(__dirname, 'assets'),
                    }
                }]
            },
            /*{
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            }*/
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "玲玲的测试",
            template: './src/index.html',// 模板文件
            inject: "true",
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: "玲玲的测试",
            template: './src/pageOne.html',// 模板文件
            filename: 'pageOne.html',
            chunks: ['pageOne']
        }),
        /* new HtmlWebpackPlugin({
             title:"玲玲的测试",
             template: './src/pageTwo.html',// 模板文件
             // inject:"header",
             filename: 'index.html'
         }),*/
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
            from: './src/json',
            to: './json'
        }]),*/
        // new webpack.HotModuleReplacementPlugin(),
        extractCss,
        /*new CleanWebpackPlugin(
            ['dist', 'build'],
            {
                verbose: false,
                // exclude: ['img']//不删除img静态资源
            },
        )*/
        new CleanWebpackPlugin(['dist']),
    ],
    externals: {
        jquery: 'jQuery',
    }
};