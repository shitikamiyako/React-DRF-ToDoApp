const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    entry: {
        frontend: "./src/index.js",
    },
    plugins: [
        // To strip all locales except “en”
        new MomentLocalesPlugin(),

        // Or: To strip all locales except “en”, “es-us” and “ru”
        // (“en” is built into Moment and can’t be removed)
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'ja'],
        }),
    ],
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader"
              }
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use: ["style-loader", "css-loader", "sass-loader"]
            },
        ],
    },
};