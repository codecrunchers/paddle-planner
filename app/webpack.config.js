'use strict';
var S3Plugin = require('webpack-s3-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    glob = require('glob'),
    path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');


let config = {
    entry: [
         './web/js/index.js',
         './web/css/index.css',
    ],
    output: {
        path: __dirname + "/dist/",
        filename: 'bundle--[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" })
//                loader: ExtractTextPlugin.extract("style-loader", "css-loader", 'less-loader')
            },
            {

                test: /\.(png|gif|jpe?g)$/,
                loader: 'file?name=/img/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: __dirname + '/web/index.html',
            title: "Paddle Planner"
        }),
        new S3Plugin({
            directory: "dist",
            s3Options: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: 'us-west-2',
            },
            s3UploadOptions: {
                Bucket: 'www.paddle-planner.com',
            },
            cdnizerOptions: {
                defaultCDNBase: 'http://www.paddle-planner.com'
            }
        })
    ]


};

module.exports = config;
