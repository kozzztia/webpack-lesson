const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',  // Или 'production'
  entry: './src/index.js',  // Точка входа
  output: {
    filename: 'bundle.js',  // Имя выходного файла
    path: path.resolve(__dirname, 'dist'),  // Папка для собранных файлов
    clean: true  // Очищать папку dist перед сборкой
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // Загрузка всех .js файлов
        exclude: /node_modules/,  // Исключаем node_modules
        use: {
          loader: 'babel-loader',  // Используем Babel для транспиляции JS
          options: {
            presets: ['@babel/preset-env']  // Пресет для поддержки современных стандартов JS
          }
        }
      },
      {
        test: /\.css$/,  // Загрузка всех .css файлов
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              modules: true,  // Включаем поддержку модулей CSS
            }
          },
          'postcss-loader'  // Добавляем postcss-loader для автопрефиксирования
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,  // Загрузка изображений
        use: [
          {
            loader: 'file-loader', // Загружаем изображения
            options: {
              name: '[path][name].[ext]',
              outputPath: 'images/', // Выходная папка для изображений
            }
          },
          {
            loader: 'image-webpack-loader', // Оптимизация изображений
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65 // Уровень сжатия для JPG
              },
              // Опции для PNG
              pngquant: {
                quality: [0.65, 0.90], // Уровень сжатия для PNG
                speed: 4
              },
              // Опции для GIF
              gifsicle: {
                interlaced: false,
              },
              // Опции для SVG
              svgo: {
                plugins: [
                  { removeTitle: true },
                  { convertPathData: false }
                ]
              },
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Используем шаблон HTML
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),  // Статическая директория для dev-сервера
    },
    port: 9000,  // Порт для локального сервера
    hot: true,  // Включаем горячую перезагрузку
  }
};
