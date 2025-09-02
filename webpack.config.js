const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'Task-list';

module.exports = {
  mode: isProd ? 'production' : 'development',

  entry: path.resolve(__dirname, 'src/index.tsx'),

  output: {
    filename: 'index.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: isProd ? `/${repoName}/` : '/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      pages: path.resolve(__dirname, 'src/pages'),
      constants: path.resolve(__dirname, 'src/constants'),
      ui: path.resolve(__dirname, 'src/ui'),
      store: path.resolve(__dirname, 'src/store'),
      styles: path.resolve(__dirname, 'src/assets/styles'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      publicPath: isProd ? `/${repoName}/` : '/',
    }),
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 3000,
    hot: true,
  },

  devtool: isProd ? false : 'source-map',
};
