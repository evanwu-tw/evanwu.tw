const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

/**
 * Generate multi html entries
 *
 * @param   {String} templateDir
 * @returns {Array}
 */
function generateHtmlPlugins(templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

  return templateFiles.map((item) => {
    // Split names and extension
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];

    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
    });
  });
}

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    filename: isProd ? 'js/[name].[hash].js' : '[name].js',
    path: path.resolve(__dirname, 'www'),
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            `css-loader?minimize=${isProd}`,
            'postcss-loader',
            'sass-loader',
          ],
          publicPath: isProd ? '../' : './',
        }),
      },
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          'pug-html-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'img/',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin(isProd ? 'css/[name].[contenthash].css' : '[name].css'),
    ...generateHtmlPlugins('./src/views'),
  ],

  devServer: {
    stats: 'errors-only',
  },
};
