// 引入一个包, 作用 拼接路径
const path = require('path');
// 引入html插件
const HtmlWebPackPlugin = require('html-webpack-plugin')
// 引入clean插件 注意不是默认的 要加{}
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// webpack 中的所有 配置信息都应配置在module.exports中
module.exports = {
    // 指定入口文件
    entry:"./src/index.ts",
    //指定打包文件所在的目录， 即webpack打包完成的文件放在哪里
    output:{
        // 指定打包文件的目录
        path:path.resolve(__dirname,'dist'),
        // 指定打包文件的文件名称
        filename:"bundle.js",

        // 告诉webpack不使用剪头函数
        environment:{
            arrowFunction:false
        }
    },
    
    // 指定webpack打包时要使用的模块
    module:{
        // 指定要加载的规则
        rules:[
            {
                // test 指定的是 规则生效的文件， 这里是正则- 所有以.ts 结尾的嗯我那件
                test: /\.ts$/,
                // 指定要是使用的loader
                use: [
                    //babel loader
                    {
                        //指定加载器
                        loader:"babel-loader",
                        //配置babel
                        options:{
                            // 设置预定义的环境，
                            presets:[
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //指定corejs版本
                                        "corejs":"3",
                                        // 使用corejs的方式, usage 表示按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    }
                    ,
                    // 放在数组后边，因为加载是从后往前加载，我们希望先使用ts-loader,
                    // 将ts编译成最新的js，然后再用bebal的loader将最新的js变成兼容的js
                    "ts-loader" 
                ],
                // 指定要排除的文件， 这里 去掉 node-modules
                exclude:/node-modules/
            }
        ]
    },
    // 配置webpack插件
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template:"./src/index.html" // 指定html模板
        })
    ],

    // 用来设置引用模块
    resolve:{
        // 表示以.ts .js作为扩展名的，都可以作为模块使用
        extensions:['.ts','.js']
    },
       // 指定mode mode值分为三种：none / development / production
       mode: 'development'

}