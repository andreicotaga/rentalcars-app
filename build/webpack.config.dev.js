'use strict';

const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("babel-polyfill");

module.exports = {
    mode: 'development',
    entry: [
        "babel-polyfill",
        './src/main.js'
    ],
    devServer: {
        hot: true,
        watchOptions: {
            poll: true
        }
    },
    module: {
        rules: [
            { test: /\.vue$/,  use: 'vue-loader' },
            { test: /\.css/,   use: ["vue-style-loader", "css-loader"] },
            { test: /\.scss$/, use: ["vue-style-loader", "css-loader", "sass-loader"] },
            { test: /\.js$/,   use: 'babel-loader' }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
};