var webpack = require('webpack'),
    path = require('path');

module.exports = {
    devtool: 'cheap-source-map',
    // devtool: 'eval-source-map', TODO Use for dev.
    // devtool: 'sourcemap', TODO Use for dist.
    entry: './js/src/App.jsx',
    output: {
        filename: './js/dist/source-bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: [/node_modules/],
            // Include JS src directory so that webpack doesn't traverse through /node_modules, improving build performance
            include: [
                path.resolve(__dirname, "js/src")
            ],
            loader: 'babel' // TODO Use for dist
            //loader: 'react-hot!babel-loader', TODO Use for dev.
        },
        {test: /\.(js|jsx)$/, loader: "eslint-loader", exclude: /node_modules/}]
    }
};
