// Generated using webpack-cli https://github.com/webpack/webpack-cli

// system packages
const path = require('path');

// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// React, TypeScript
const jsHandler = 'ts-loader'

// CSS
const stylesHandler = 'style-loader';
const cssHandler = 'css-loader'

// Environment variables
const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: path.resolve(__dirname, './src/client/index.tsx',),
    output: {
        filename: 'client.bundle.js',
        path: path.resolve(__dirname, './dist/client/'),
        publicPath: '/'
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, './assets'),
            publicPath: '/assets'  // Ensure assets are served from the root
        },
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.js$/, // Process JavaScript files
                enforce: 'pre', // Ensure this runs before other loaders
                use: ['source-map-loader'],
                // exclude: /node_modules/, // Optional: Exclude node_modules if you don't need their source maps
            },
            {
                test: /\.(ts|tsx)$/i,
                exclude: ['/node_modules/'],
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'tsconfig.client.json')
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, cssHandler],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },


            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '...'],
    }
}


module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';

    }
    return config;
};
