import { createReduxStore, register } from '@wordpress/data';
import { merge } from 'lodash';

export const STORE_KEY = '@reactive-pack/edit-custom-post-type-interface';

const DEFAULT_CONFIG = {
    WritingFlowWrapper: null,
    DocumentSettingSidebar: null,
    documentSettingTitle: null,
    useEditorStyles: true,
    renderAppender: null
};

export const store = createReduxStore(STORE_KEY, {
    reducer(state = DEFAULT_CONFIG, action) {
        switch (action.type) {
            case 'SET_WRITING_FLOW_WRAPPER': {
                return {
                    ...state,
                    WritingFlowWrapper: action.component
                }
            }

            case 'SET_DOCUMENT_SETTING_SIDEBAR': {
                return {
                    ...state,
                    DocumentSettingSidebar: action.component
                }
            }

            case 'SET_DOCUMENT_SETTING_TITLE': {
                return {
                    ...state,
                    documentSettingTitle: action.title
                }
            }

            case 'SET_USE_EDITOR_STYLES': {
                return {
                    ...state,
                    useEditorStyles: action.useEditorStyles
                }
            }

            case 'SET_RENDER_APPENDER': {
                return {
                    ...state,
                    renderAppender: action.appender
                }
            }

            case 'APPLY_OPTIONS': {
                return merge(state, action.options);
            }
        }

        return state;
    },
    selectors: {
        getWritingFlowWrapper(state) {
            return state.WritingFlowWrapper;
        },

        getDocumentSettingSidebar(state) {
            return state.DocumentSettingSidebar;
        },

        getDocumentSettingTitle(state) {
            return state.documentSettingTitle;
        },

        getUseEditorStyles(state) {
            return state.useEditorStyles;
        },

        getRenderAppender(state) {
            return state.renderAppender;
        }
    },
    actions: {
        setWritingFlowWrapper(component) {
            return {
                type: 'SET_WRITING_FLOW_WRAPPER',
                component
            };
        },

        setDocumentSettingSidebar(component) {
            return {
                type: 'SET_DOCUMENT_SETTING_SIDEBAR',
                component
            };
        },

        setDocumentSettingTitle(title) {
            return {
                type: 'SET_DOCUMENT_SETTING_TITLE',
                title
            };
        },

        setUseEditorStyles(useEditorStyles) {
            return {
                type: 'SET_USE_EDITOR_STYLES',
                useEditorStyles
            };
        },

        setRenderAppender(appender) {
            return {
                type: 'SET_RENDER_APPENDER',
                appender
            };
        },

        applyOptions(options) {
            return {
                type: 'APPLY_OPTIONS',
                options
            };
        }
    }
});

register(store);