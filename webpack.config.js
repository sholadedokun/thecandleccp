require ('babel-register');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const partials = require("./libs/webpackPartials");
const path = require('path');
const pkg = require("./package.json");
const dep = pkg.dependencies;

const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;
// process.traceDeprecation = true;

const PATHS = {
    app: path.resolve(__dirname, "app"),
    build: path.resolve(__dirname, "public"),
    style: {
        main: path.resolve(__dirname, "app", "main.scss"),
        theme: path.resolve(__dirname, 'app/theme.scss'),
        vendor: [
            path.resolve(__dirname, "app/assets", "vendorCSS/fontawesome"),
            path.resolve(__dirname, "app/assets", "vendorCSS/icofont")
        ]
    },
    image: path.resolve(__dirname, "app", "assets/img"),
    font: path.resolve(__dirname, "app", "assets/fonts"),
    hmr: 'react-hot-loader/patch',
    wds: 'webpack-dev-server/client?http://localhost:8080'
};

const merge = require("webpack-merge");

const commonConfig = {
    entry: {
        style: PATHS.style.main,
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: "[name].js",
    },
    // postcss: [
    //     autoprefixer({
    //         browsers: [
    //             'last 2 versions','ie >= 9',
    //             'and_chr >= 2.3'
    //         ]
    //     })
    // ],
    plugins:[
        new HtmlWebpackPlugin({
            title: "Daju",
            template: './libs/template.html',
            appMountId: 'app',
            inject: false,
            mobile: true
        })
    ],
    resolve: {
        extensions:['.css', '.js', '.es6', '.json', '.scss', '.jsx', '.html'],
        modules: [
            path.resolve('./app'),
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    module: {
      noParse:[path.resolve(__dirname, 'node_modules/localforage/')],
    },
};

var config;

switch (process.env.npm_lifecycle_event){
    case "stats":
    case "build":
        config = merge(
            commonConfig,
            {
                devtool: "source-map",
                output: {
                    path: PATHS.build,
                    filename: "[name].[chunkhash].js",
                    chunkFilename: "[chunkhash].js"
                }
            },
            partials.cleanBuildFolder(PATHS.build),
            partials.setFreeVariable(
                "process.env.NODE_ENV",
                "production"
            ),
            partials.extractBundle({
                name: "vendor",
                entries: dep
            }),
            partials.minify(),
            partials.extractSCSS(PATHS.style),
            partials.purifyCSS([PATHS.app]),
            partials.transformJS(PATHS.app),
            partials.loadImages(PATHS.image),
            partials.loadFonts(PATHS.font)
        );
        break;
    default:
        config = merge(
            commonConfig,
            partials.devServer({
                host: process.env.HOST,
                port: process.env.PORT,
                // publicPath: 'http://localhost:8080',
                // contentBase: '/assets/'
            }),
            {
                entry: [
                    PATHS.wds,
                    PATHS.app,
                    PATHS.hmr
                ],
                devtool: "eval-source-map"
            },
            partials.setupCSS(PATHS.style),
            partials.transformJSHot(PATHS.app),
            partials.inlineImages(PATHS.image, 25000),
            partials.loadFonts(PATHS.font, 50000)
        );

};

module.exports = config
