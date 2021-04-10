import path from "path";
import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const webpackConfig = (env): Configuration => ({
  entry: "./src/index.tsx",
  ...(env.production || !env.development ? {} : {devtool: "eval-source-map"}),
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        },
        exclude: /dist/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "autoprefixer",
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                  "precss",
                  "postcss-nesting",
                ],
              },
            },
          },
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "autoprefixer",
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                  "precss",
                  "postcss-nesting",
                ],
              },
            },
          },
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(eot|otf|woff|woff2|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './[name].[ext]',
            outputPath: 'fonts',
          },
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.DefinePlugin({
      "process.env.PRODUCTION": env.production || !env.development,
      "process.env.NAME": JSON.stringify(require("./package.json").name),
      "process.env.VERSION": JSON.stringify(require("./package.json").version)
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}" // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      }
    }),
  ]
});

export default webpackConfig;