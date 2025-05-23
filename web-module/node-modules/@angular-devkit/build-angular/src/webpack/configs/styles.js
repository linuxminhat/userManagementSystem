"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStylesConfig = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sass_service_1 = require("../../sass/sass-service");
const build_browser_features_1 = require("../../utils/build-browser-features");
const environment_options_1 = require("../../utils/environment-options");
const plugins_1 = require("../plugins");
const helpers_1 = require("../utils/helpers");
function resolveGlobalStyles(styleEntrypoints, root, preserveSymlinks) {
    const entryPoints = {};
    const noInjectNames = [];
    const paths = [];
    if (styleEntrypoints.length === 0) {
        return { entryPoints, noInjectNames, paths };
    }
    for (const style of helpers_1.normalizeExtraEntryPoints(styleEntrypoints, 'styles')) {
        let resolvedPath = path.resolve(root, style.input);
        if (!fs.existsSync(resolvedPath)) {
            try {
                resolvedPath = require.resolve(style.input, { paths: [root] });
            }
            catch { }
        }
        if (!preserveSymlinks) {
            resolvedPath = fs.realpathSync(resolvedPath);
        }
        // Add style entry points.
        if (entryPoints[style.bundleName]) {
            entryPoints[style.bundleName].push(resolvedPath);
        }
        else {
            entryPoints[style.bundleName] = [resolvedPath];
        }
        // Add non injected styles to the list.
        if (!style.inject) {
            noInjectNames.push(style.bundleName);
        }
        // Add global css paths.
        paths.push(resolvedPath);
    }
    return { entryPoints, noInjectNames, paths };
}
// eslint-disable-next-line max-lines-per-function
function getStylesConfig(wco) {
    var _a, _b, _c;
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const postcssImports = require('postcss-import');
    const postcssPresetEnv = require('postcss-preset-env');
    const { root, buildOptions } = wco;
    const extraPlugins = [];
    extraPlugins.push(new plugins_1.AnyComponentStyleBudgetChecker(buildOptions.budgets));
    const cssSourceMap = buildOptions.sourceMap.styles;
    // Determine hashing format.
    const hashFormat = helpers_1.getOutputHashFormat(buildOptions.outputHashing);
    // use includePaths from appConfig
    const includePaths = (_c = (_b = (_a = buildOptions.stylePreprocessorOptions) === null || _a === void 0 ? void 0 : _a.includePaths) === null || _b === void 0 ? void 0 : _b.map((p) => path.resolve(root, p))) !== null && _c !== void 0 ? _c : [];
    // Process global styles.
    const { entryPoints, noInjectNames, paths: globalStylePaths, } = resolveGlobalStyles(buildOptions.styles, root, !!buildOptions.preserveSymlinks);
    if (noInjectNames.length > 0) {
        // Add plugin to remove hashes from lazy styles.
        extraPlugins.push(new plugins_1.RemoveHashPlugin({ chunkNames: noInjectNames, hashFormat }));
    }
    if (globalStylePaths.some((p) => p.endsWith('.styl'))) {
        wco.logger.warn('Stylus usage is deprecated and will be removed in a future major version. ' +
            'To opt-out of the deprecated behaviour, please migrate to another stylesheet language.');
    }
    let sassImplementation;
    try {
        sassImplementation = require('node-sass');
        wco.logger.warn(`'node-sass' usage is deprecated and will be removed in a future major version. ` +
            `To opt-out of the deprecated behaviour and start using 'sass' uninstall 'node-sass'.`);
    }
    catch {
        sassImplementation = new sass_service_1.SassWorkerImplementation();
        extraPlugins.push({
            apply(compiler) {
                compiler.hooks.shutdown.tap('sass-worker', () => {
                    sassImplementation === null || sassImplementation === void 0 ? void 0 : sassImplementation.close();
                });
            },
        });
    }
    const assetNameTemplate = helpers_1.assetNameTemplateFactory(hashFormat);
    const extraPostcssPlugins = [];
    // Attempt to setup Tailwind CSS
    // A configuration file can exist in the project or workspace root
    const tailwindConfigFile = 'tailwind.config.js';
    let tailwindConfigPath;
    for (const basePath of [wco.projectRoot, wco.root]) {
        const fullPath = path.join(basePath, tailwindConfigFile);
        if (fs.existsSync(fullPath)) {
            tailwindConfigPath = fullPath;
            break;
        }
    }
    // Only load Tailwind CSS plugin if configuration file was found.
    // This acts as a guard to ensure the project actually wants to use Tailwind CSS.
    // The package may be unknowningly present due to a third-party transitive package dependency.
    if (tailwindConfigPath) {
        let tailwindPackagePath;
        try {
            tailwindPackagePath = require.resolve('tailwindcss', { paths: [wco.root] });
        }
        catch {
            const relativeTailwindConfigPath = path.relative(wco.root, tailwindConfigPath);
            wco.logger.warn(`Tailwind CSS configuration file found (${relativeTailwindConfigPath})` +
                ` but the 'tailwindcss' package is not installed.` +
                ` To enable Tailwind CSS, please install the 'tailwindcss' package.`);
        }
        if (tailwindPackagePath) {
            if (process.env['TAILWIND_MODE'] === undefined) {
                process.env['TAILWIND_MODE'] = buildOptions.watch ? 'watch' : 'build';
            }
            extraPostcssPlugins.push(require(tailwindPackagePath)({ config: tailwindConfigPath }));
        }
    }
    const { supportedBrowsers } = new build_browser_features_1.BuildBrowserFeatures(wco.projectRoot);
    const postcssPresetEnvPlugin = postcssPresetEnv({
        browsers: supportedBrowsers,
        autoprefixer: true,
        stage: 3,
    });
    const postcssOptionsCreator = (inlineSourcemaps, extracted) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const optionGenerator = (loader) => ({
            map: inlineSourcemaps
                ? {
                    inline: true,
                    annotation: false,
                }
                : undefined,
            plugins: [
                postcssImports({
                    resolve: (url) => (url.startsWith('~') ? url.substr(1) : url),
                    load: (filename) => {
                        return new Promise((resolve, reject) => {
                            loader.fs.readFile(filename, (err, data) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                const content = data.toString();
                                resolve(content);
                            });
                        });
                    },
                }),
                plugins_1.PostcssCliResources({
                    baseHref: buildOptions.baseHref,
                    deployUrl: buildOptions.deployUrl,
                    resourcesOutputPath: buildOptions.resourcesOutputPath,
                    loader,
                    filename: assetNameTemplate,
                    emitFile: buildOptions.platform !== 'server',
                    extracted,
                }),
                ...extraPostcssPlugins,
                postcssPresetEnvPlugin,
            ],
        });
        // postcss-loader fails when trying to determine configuration files for data URIs
        optionGenerator.config = false;
        return optionGenerator;
    };
    // load component css as raw strings
    const componentsSourceMap = !!(cssSourceMap &&
        // Never use component css sourcemap when style optimizations are on.
        // It will just increase bundle size without offering good debug experience.
        !buildOptions.optimization.styles.minify &&
        // Inline all sourcemap types except hidden ones, which are the same as no sourcemaps
        // for component css.
        !buildOptions.sourceMap.hidden);
    if (buildOptions.extractCss) {
        // extract global css from js files into own css file.
        extraPlugins.push(new MiniCssExtractPlugin({ filename: `[name]${hashFormat.extract}.css` }));
        if (!buildOptions.hmr) {
            // don't remove `.js` files for `.css` when we are using HMR these contain HMR accept codes.
            // suppress empty .js files in css only entry points.
            extraPlugins.push(new plugins_1.SuppressExtractedTextChunksWebpackPlugin());
        }
    }
    const postCss = require('postcss');
    const postCssLoaderPath = require.resolve('postcss-loader');
    const componentStyleLoaders = [
        {
            loader: postCssLoaderPath,
            options: {
                implementation: postCss,
                postcssOptions: postcssOptionsCreator(componentsSourceMap, false),
            },
        },
    ];
    const globalStyleLoaders = [
        buildOptions.extractCss
            ? {
                loader: MiniCssExtractPlugin.loader,
            }
            : require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: {
                url: false,
                sourceMap: !!cssSourceMap,
            },
        },
        {
            loader: postCssLoaderPath,
            options: {
                implementation: postCss,
                postcssOptions: postcssOptionsCreator(false, buildOptions.extractCss),
                sourceMap: !!cssSourceMap,
            },
        },
    ];
    const extraMinimizers = [];
    if (buildOptions.optimization.styles.minify) {
        const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
        const esbuild = require('esbuild');
        const cssnanoOptions = {
            preset: [
                'default',
                {
                    // Disable SVG optimizations, as this can cause optimizations which are not compatible in all browsers.
                    svgo: false,
                    // Disable `calc` optimizations, due to several issues. #16910, #16875, #17890
                    calc: false,
                    // Disable CSS rules sorted due to several issues #20693, https://github.com/ionic-team/ionic-framework/issues/23266 and https://github.com/cssnano/cssnano/issues/1054
                    cssDeclarationSorter: false,
                    // Workaround for Critters as it doesn't work when `@media all {}` is minified to `@media {}`.
                    // TODO: Remove once they move to postcss.
                    minifyParams: !buildOptions.optimization.styles.inlineCritical,
                },
            ],
        };
        const globalBundlesRegExp = new RegExp(`^(${Object.keys(entryPoints).join('|')})(\.[0-9a-f]{20})?.css$`);
        const target = transformSupportedBrowsersToTargets(supportedBrowsers);
        extraMinimizers.push(
        // Component styles use esbuild which is faster and generates smaller files on average.
        // esbuild does not yet support style sourcemaps but component style sourcemaps are not
        // supported by the CLI when style minify is enabled.
        new CssMinimizerPlugin({
            // Component styles retain their original file name
            test: /\.(?:css|scss|sass|less|styl)$/,
            exclude: globalBundlesRegExp,
            parallel: false,
            minify: async (data) => {
                const [[sourcefile, input]] = Object.entries(data);
                const { code, warnings } = await esbuild.transform(input, {
                    loader: 'css',
                    minify: true,
                    sourcefile,
                    target,
                });
                return {
                    code,
                    warnings: warnings.length > 0
                        ? await esbuild.formatMessages(warnings, { kind: 'warning' })
                        : [],
                };
            },
        }), 
        // Global styles use cssnano since sourcemap support is required even when minify
        // is enabled. Once esbuild supports style sourcemaps this can be changed.
        // esbuild stylesheet source map support issue: https://github.com/evanw/esbuild/issues/519
        new CssMinimizerPlugin({
            test: /\.css$/,
            include: globalBundlesRegExp,
            parallel: environment_options_1.maxWorkers,
            minify: [CssMinimizerPlugin.cssnanoMinify],
            minimizerOptions: cssnanoOptions,
        }));
    }
    const styleLanguages = [
        {
            extensions: ['css'],
            use: [],
        },
        {
            extensions: ['scss'],
            use: [
                {
                    loader: require.resolve('resolve-url-loader'),
                    options: {
                        sourceMap: cssSourceMap,
                    },
                },
                {
                    loader: require.resolve('sass-loader'),
                    options: {
                        implementation: sassImplementation,
                        sourceMap: true,
                        sassOptions: {
                            // Prevent use of `fibers` package as it no longer works in newer Node.js versions
                            fiber: false,
                            // bootstrap-sass requires a minimum precision of 8
                            precision: 8,
                            includePaths,
                            // Use expanded as otherwise sass will remove comments that are needed for autoprefixer
                            // Ex: /* autoprefixer grid: autoplace */
                            // See: https://github.com/webpack-contrib/sass-loader/blob/45ad0be17264ceada5f0b4fb87e9357abe85c4ff/src/getSassOptions.js#L68-L70
                            outputStyle: 'expanded',
                            // Silences compiler warnings from 3rd party stylesheets
                            quietDeps: !buildOptions.verbose,
                            verbose: buildOptions.verbose,
                        },
                    },
                },
            ],
        },
        {
            extensions: ['sass'],
            use: [
                {
                    loader: require.resolve('resolve-url-loader'),
                    options: {
                        sourceMap: cssSourceMap,
                    },
                },
                {
                    loader: require.resolve('sass-loader'),
                    options: {
                        implementation: sassImplementation,
                        sourceMap: true,
                        sassOptions: {
                            // Prevent use of `fibers` package as it no longer works in newer Node.js versions
                            fiber: false,
                            indentedSyntax: true,
                            // bootstrap-sass requires a minimum precision of 8
                            precision: 8,
                            includePaths,
                            // Use expanded as otherwise sass will remove comments that are needed for autoprefixer
                            // Ex: /* autoprefixer grid: autoplace */
                            // See: https://github.com/webpack-contrib/sass-loader/blob/45ad0be17264ceada5f0b4fb87e9357abe85c4ff/src/getSassOptions.js#L68-L70
                            outputStyle: 'expanded',
                            // Silences compiler warnings from 3rd party stylesheets
                            quietDeps: !buildOptions.verbose,
                            verbose: buildOptions.verbose,
                        },
                    },
                },
            ],
        },
        {
            extensions: ['less'],
            use: [
                {
                    loader: require.resolve('less-loader'),
                    options: {
                        implementation: require('less'),
                        sourceMap: cssSourceMap,
                        lessOptions: {
                            javascriptEnabled: true,
                            paths: includePaths,
                        },
                    },
                },
            ],
        },
        {
            extensions: ['styl'],
            use: [
                {
                    loader: require.resolve('stylus-loader'),
                    options: {
                        sourceMap: cssSourceMap,
                        stylusOptions: {
                            compress: false,
                            sourceMap: { comment: false },
                            paths: includePaths,
                        },
                    },
                },
            ],
        },
    ];
    return {
        entry: entryPoints,
        module: {
            rules: styleLanguages.map(({ extensions, use }) => ({
                test: new RegExp(`\\.(?:${extensions.join('|')})$`, 'i'),
                rules: [
                    // Setup processing rules for global and component styles
                    {
                        oneOf: [
                            // Component styles are all styles except defined global styles
                            {
                                exclude: globalStylePaths,
                                use: componentStyleLoaders,
                                type: 'asset/source',
                            },
                            // Global styles are only defined global styles
                            {
                                include: globalStylePaths,
                                use: globalStyleLoaders,
                            },
                        ],
                    },
                    { use },
                ],
            })),
        },
        optimization: {
            minimizer: extraMinimizers,
        },
        plugins: extraPlugins,
    };
}
exports.getStylesConfig = getStylesConfig;
function transformSupportedBrowsersToTargets(supportedBrowsers) {
    const transformed = [];
    // https://esbuild.github.io/api/#target
    const esBuildSupportedBrowsers = new Set(['safari', 'firefox', 'edge', 'chrome', 'ios']);
    for (const browser of supportedBrowsers) {
        const [browserName, version] = browser.split(' ');
        if (esBuildSupportedBrowsers.has(browserName)) {
            transformed.push(browserName + version);
        }
    }
    return transformed.length ? transformed : undefined;
}
