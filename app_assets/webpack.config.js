const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const mode = argv.mode === 'production' ? 'production' : 'development';

    const isDev  = mode === 'development';
    const isProd = mode === 'production';

    let config = {
        name: 'assets',
        entry: {
            main: './assets/main.js'
        },
        mode,
        output: {
            publicPath: '/assets/',
            path: path.resolve(__dirname, '../public/assets'),
            filename: 'js/[name].js',
            clean: true,
        },

        optimization: {
            minimizer: isProd ? [
                new CssMinimizerPlugin(),
            ] : [],
        },

        module: {
            rules: [
                {
                    test: require.resolve("jquery"),
                    loader: "expose-loader",
                    options: {
                        exposes: ["$", "jQuery"],
                    },
                },
                {
                    test: /\.js$/i,
                    exclude: /node_modules|test|dist/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[ext]',
                                esModule: false,
                            },
                        },
                    ],
                    type: 'javascript/auto'
                }
            ]
        }, // end of module

        plugins: [
            new CleanWebpackPlugin(),

            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
            }),
        ],

    };

    if (isDev) {
        config.devtool = 'source-map'
    }

    return config;
};
