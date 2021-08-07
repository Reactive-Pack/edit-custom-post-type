import { STORE_KEY } from '@reactive-pack/edit-custom-post-type-store';
import { dispatch } from "@wordpress/data";

export const GUTENBERG_VERSIONS = [
    /** WordPress: 5,6 **/ 9.2,
    /** WordPress: 5,7 **/ 9.9,
    /** WordPress: 5,8 **/ 10.7,
    /** Not published in core WordPress **/
    10.8, 10.9, 11.0, 11.1,
];

export function startup(editorOptions) {
    dispatch(STORE_KEY).applyOptions(editorOptions);

    return reactivePack.editCustomPostType;
}