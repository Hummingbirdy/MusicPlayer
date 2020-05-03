"use strict";
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './wwwroot/source/index.jsx',

        vendors: [
            "babel-polyfill",
            "whatwg-fetch"
        ]
    },
    output: {
        path: path.resolve(__dirname, 'wwwroot/dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }],
                            ["transform-decorators-legacy"]
                        ],
                        presets: [
                            ["@babel/preset-env", {
                                "targets": {
                                    'browsers': ['Chrome >=59']
                                },
                                "modules": false
                            }], "@babel/react", {
                                'plugins': ['@babel/plugin-proposal-class-properties']
                            }],
                    }
                }
            }
        ]
    }

};