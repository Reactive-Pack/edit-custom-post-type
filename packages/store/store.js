import { createReduxStore, register } from '@wordpress/data';
import { merge } from 'lodash';

export const STORE_KEY = '@reactive-pack/edit-custom-post-type-interface';

const DEFAULT_CONFIG = {
    options: {
        WritingFlowWrapper: null,
        DocumentSettingSidebar: null,
        documentSettingTitle: null,
        useEditorStyles: true,
        renderAppender: null,
        usePostTitle: true,
        publiclyQueryable: true,
        blockListPlaceholder: null
    }
};

export const store = createReduxStore(STORE_KEY, {
    reducer(state = DEFAULT_CONFIG, action) {
        switch (action.type) {
            case 'APPLY_OPTIONS': {
                return {
                    ...state,
                    options: merge(state.options, action.options)
                };
            }
        }

        return state;
    },
    selectors: {
        getOption(state, index) {
            return state.options.hasOwnProperty(index) ? state.options[index] : undefined;
        },

        getWritingFlowWrapper(state) {
            return state.options.WritingFlowWrapper;
        },

        getDocumentSettingSidebar(state) {
            return state.options.DocumentSettingSidebar;
        },

        getDocumentSettingTitle(state) {
            return state.options.documentSettingTitle;
        },

        getUseEditorStyles(state) {
            return state.options.useEditorStyles;
        },

        getRenderAppender(state) {
            return state.options.renderAppender;
        }
    },
    actions: {
        applyOptions(options) {
            return {
                type: 'APPLY_OPTIONS',
                options
            };
        }
    }
});

register(store);