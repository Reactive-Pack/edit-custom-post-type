const GUTENBERG_VERSIONS = [
    /** WordPress: 5,6 **/
    8.6, 8.7, 8.8, 8.9, 9.0, 9.1, 9.2,
    /** WordPress: 5,7 **/
    9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9,
    /** WordPress: 5,8 **/
    10.0, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7,
    /** Not published in core WordPress **/
    10.8, 10.9, 11.0, 11.1,
];

export async function importEditPostPackage(gutenbergVersion) {
    if (!GUTENBERG_VERSIONS.includes(gutenbergVersion)) {
        throw new Error('Specified Gutenberg version is not supported');
    }

    return await import(
        /* webpackChunkName: "edit-custom-post-type/[request]" */
        /* webpackMode: "lazy" */
        `@reactive-pack/edit-custom-post-type/edit-post-${gutenbergVersion}v`
    );
}