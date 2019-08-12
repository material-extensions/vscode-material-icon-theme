'use strict';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const config = {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    entry: './src/extension.ts',
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    }
};

module.exports = config;