/**
 * External dependencies
 */
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const { DefinePlugin } = require( 'webpack' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const { compact } = require( 'lodash' );
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * WordPress dependencies
 */
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const ReadableJsAssetsWebpackPlugin = require( '@wordpress/readable-js-assets-webpack-plugin' );

const {
	NODE_ENV: mode = 'development',
	WP_DEVTOOL: devtool = mode === 'production' ? false : 'inline-source-map',
} = process.env;

console.info( `Build ${mode} version scripts` );

const baseConfig = {
	optimization: {
		// Only concatenate modules in production, when not analyzing bundles.
		concatenateModules:
			mode === 'production' && ! process.env.WP_BUNDLE_ANALYZER,
		minimize: true,
		minimizer: [
			new TerserPlugin( {
				cache: true,
				parallel: true,
				//sourceMap: mode !== 'production',
				terserOptions: {
					output: {
						comments: /translators:/i,
					},
					compress: {
						passes: 2,
					},
					mangle: {
						reserved: [ '__', '_n', '_nx', '_x' ],
					},
				},
				extractComments: false
			} ),
			/**new UglifyJsPlugin({
				parallel: true,
				cache: true,
				sourceMap: false,
				extractComments: false,
				exclude: [/\.min\.js$/gi]
			})**/
		]
	},
	mode,
	module: {
		rules: compact( [
			mode !== 'production' && {
				test: /\.js$/,
				use: require.resolve( 'source-map-loader' ),
				enforce: 'pre',
			},
		] ),
	},
	watchOptions: {
		ignored: [ '**/node_modules', '**/packages/*/src' ],
		aggregateTimeout: 500,
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	devtool
};

const plugins = [
	// The WP_BUNDLE_ANALYZER global variable enables a utility that represents bundle
	// content as a convenient interactive zoomable treemap.
	process.env.WP_BUNDLE_ANALYZER && new BundleAnalyzerPlugin(),
	new DefinePlugin( {
		// Inject the `GUTENBERG_PHASE` global, used for feature flagging.
		'process.env.GUTENBERG_PHASE': JSON.stringify(
			parseInt( process.env.npm_package_config_GUTENBERG_PHASE, 10 ) || 1
		),
		'process.env.FORCE_REDUCED_MOTION': JSON.stringify(
			process.env.FORCE_REDUCED_MOTION
		),
	} ),
	new DependencyExtractionWebpackPlugin( { injectPolyfill: true } ),
	//mode === 'production' && new ReadableJsAssetsWebpackPlugin()
];

module.exports = {
	baseConfig,
	plugins,
};
