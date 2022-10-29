import path from 'path'
let dirname = path.resolve()
export default [
  {
    entry: './dist/frontend',
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(dirname, 'public'),
      filename: 'bundle.js'

    },
    devtool: 'inline-source-map',

    module: {
      rules: [
        {
          test: /\.(jsx|js|ts|tsx)$/,
          include: path.resolve(dirname, 'public'),
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  "targets": "defaults" 
                }],
                '@babel/preset-react'
              ]
            }
          }]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true
              }
            }
          ]
        }

      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  },
  {
    entry: './dist/GameFrontend',
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(dirname, 'public'),
      filename: 'gameBundle.js'
    },
    devtool: 'inline-source-map',

    module: {
      rules: [
        {
          test: /\.(jsx|js|ts|tsx)$/,
          include: path.resolve(dirname, 'public'),
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  "targets": "defaults" 
                }],
                '@babel/preset-react'
              ]
            }
          }]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true
              }
            }
          ]
        }

      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }
]