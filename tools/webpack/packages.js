/**
 * External dependencies
 */
const { join } = require( 'path' );
const { readdirSync } = require('fs');

/**
 * WordPress dependencies
 */
const CustomTemplatedPathPlugin = require( '@wordpress/custom-templated-path-webpack-plugin' );
const {
	camelCaseDash,
} = require( '@wordpress/dependency-extraction-webpack-plugin/lib/util' );

/**
 * Internal dependencies
 */
const { dependencies } = require( '../../package' );
const { baseConfig, plugins } = require( './shared' );

const packages = Object.keys( dependencies ).filter( packageName => packageName !== 'store' );

module.exports = {
	...baseConfig,
	name: 'packages',
	entry: packages.reduce( ( memo, packageName ) => {
		let entryName = packageName;

		if ( packageName.startsWith( 'edit-post-' ) ) {
			entryName = packageName.replace( 'edit-post-', '' );
		}

		return {
			...memo,
			[ entryName ]: `./packages/${ packageName }`,
		};
	}, {} ),
	output: {
		devtoolNamespace: 'reactivePack.editCustomPostType',
		filename: './build/[name]/index.js',
		path: join( __dirname, '..', '..' ),
		library: [ 'reactivePack', 'editCustomPostType' ],
		libraryTarget: 'window',
	},
	plugins: [
		...plugins,
		new CustomTemplatedPathPlugin( {
			camelName( path, data ) {
				return camelCaseDash( data.chunk.name );
			}
		} ),
	].filter( Boolean ),
};
