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
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,  // Загрузка изображений
        type: 'asset/resource',  // Обработка и копирование изображений
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
