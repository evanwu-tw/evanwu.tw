const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';

/**
 * Generate multi html entries
 *
 * @param   {String} templateDir
 * @returns {Array}
 */
function generateHtmlPlugins(templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve('.', templateDir));

  return templateFiles.map((item) => {
    // Split names and extension
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];

    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve('.', `${templateDir}/${name}.${extension}`),
    });
  });
}

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.js',
  context: path.resolve(__dirname, '..'),
  output: {
    filename: isProd ? 'js/[name].[hash:8].js' : '[name].js',
    path: path.resolve('.', 'www'),
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: isProd,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer({
                    browsers: ['last 2 versions'],
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
              },
            },
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
              name: '[name].[hash:8].[ext]',
              outputPath: 'img/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin(isProd ? 'css/[name].[contenthash:8].css' : '[name].css'),
    ...generateHtmlPlugins('src/views'),
  ],

  devServer: {
    stats: 'errors-only',
    // Can be accessible externally
    host: '0.0.0.0',
    // Serve files in `public/` directory
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
  },
};
