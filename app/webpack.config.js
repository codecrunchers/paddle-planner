'use strict';
var S3Plugin = require('webpack-s3-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'),
      glob = require('glob'), path = require("path");


let config = {

    entry: {
        paddle_planner: __dirname + '/web/js/index'
    },
/*    module: {
        loaders: [
            // Javascript: js, jsx
        {

            test: /\.jsx?$/,

            loader: 'babel-loader'

        },

        // CSS: scss, css

        {

            test: /\.s?css$/,

            loaders: ['style', 'css', 'sass', 'postcss-loader']

        },

        // SVGs: svg, svg?something

        {

            test: /\.svg(\?.*$|$)/,

            loader: 'file-loader?name=/img/[name].[ext]'

        },

        // Images: png, gif, jpg, jpeg

        {

            test: /\.(png|gif|jpe?g)$/,

            loader: 'file?name=/img/[name].[ext]'

        },

        // HTML: htm, html

        {

            test: /\.html?$/,

            loader: "file?name=[name].[ext]"

        },

        // Font files: eot, ttf, woff, woff2

        {

            test: /\.(eot|ttf|woff2?)(\?.*$|$)/,
            loader: 'file?name=/fonts/[name].[ext]'

        }

        ]

    },
    */

    output: {
        path: __dirname + "/dist/",
        filename: 'bundle--[name].js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: __dirname + '/web/index.html',
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
