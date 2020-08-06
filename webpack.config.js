const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const pixiModule = path.join(__dirname, '/node_modules/pixi.js/');
const pixi = path.join(pixiModule, 'dist/pixi.min.js');

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, 'src/main.ts')
        ],
    },
    devtool: 'cheap-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    watch: true,
    plugins: [
        new CleanWebpackPlugin(),
        new MinifyPlugin(),
        new HtmlWebpackPlugin({
            inlineSource: '.(js|css)$',
            template: path.resolve(__dirname, 'src/index.ejs'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
        }),
        new ScriptExtHtmlWebpackPlugin({
            inline: ['app'],
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['babel-loader', 'awesome-typescript-loader'],
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.(png|jp(e*)g|svg|mp3)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[hash]-[name].[ext]',
                        publicPath: 'images/'
                    }
                }]
            }
        ],
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'pixi': pixi,
        }
    }
}
