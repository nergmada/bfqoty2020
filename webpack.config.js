const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');

module.exports = env => {
    const mode = env && ['production', 'development'].includes(env.MODE) ? env.MODE : 'development';   
    const dev = mode === 'development';
    return [{
        name: 'tryal-ai-web-server',
        mode: 'development',
        target: 'node',
        entry: './server/index.js',
        output: {
            path: path.resolve(__dirname, './build'),
            filename: 'server.js'
        },
        resolve: {
            alias: {
                questions: path.resolve('server', 'questions'),
                db: path.resolve('server', 'db'),
                server: path.resolve('server'),
            },
            extensions: ['.mjs', '.js'],
            mainFields: ['module', 'main']
        },
        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
                { test: /\.yaml$/, exclude: /node_modules/, use: ["json-loader", "yaml-loader"] }
            ]
        },
        plugins: [
            new CopyPlugin([
                './.env'
            ]),
        ],
    },
    {
        name: 'big-fat-quiz-web-client',
        mode,
        target: 'web',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, './build/static'),
            filename: '[name].js'
        },
        resolve: {
            alias: {
                //Svelte
                svelte: path.resolve('node_modules', 'svelte'),
                //Src links
                components: path.resolve('src', 'components'),
                styles: path.resolve('src', 'styles'),
                lib: path.resolve('src', 'lib'),
                assets: path.resolve('src', 'assets')
            },
            extensions: ['.mjs', '.js', '.svelte'],
            mainFields: ['svelte', 'browser', 'module', 'main']
        },
        module: {
            rules: [
                {
                    test: /\.(html|svelte)$/,
                    //exclude: /node_modules/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            emitCss: true,
                            css: true,
                            hotReload: dev
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        dev ? 'style-loader' : ExtractCssChunks.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                            }
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        dev ? 'style-loader' : ExtractCssChunks.loader,
                        // Translates CSS into CommonJS
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                            }
                        },
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.mp3$/i,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 1000000,
                            name: 'assets/[hash]-[name].[ext]'
                        }
                    }],
                }
            ]
        },
        plugins: [
            new ExtractCssChunks({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
            }),
            new CopyPlugin([
                { from: 'assets/**/*', context: 'src' }
            ]),
            new CompressionPlugin({
                test: /\.(css|js)$/
            }),
            new HtmlWebpackPlugin({
                title: "Big Fat Quiz of the Year 2020"
            }),
        ],
    }];
}
