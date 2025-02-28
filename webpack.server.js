// Generated using webpack-cli https://github.com/webpack/webpack-cli

// system packages
const path = require('path');

// TypeScript
const jsHandler = 'babel-loader'

// Environment variables
const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: path.resolve(__dirname, './src/server/index.ts',),
    output: {
        filename: 'server.bundle.js',
        path: path.resolve(__dirname, './dist/server'),
    },
    target: 'node',
    module: {
        rules: [,
            {
                test: /\.ts$/i,
                exclude: ['/node_modules/'],
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'tsconfig.server.json')
                    }
                }
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '...'],
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
