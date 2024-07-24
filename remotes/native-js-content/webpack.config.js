const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    mode: "development",
    devServer: {
        port: 8082,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),

        new ModuleFederationPlugin({
            name: 'native_js_content',
            filename: 'remoteEntry.js',
            exposes: {
                './native_js_content': './src/index'
            },
        }),
    ]
}
