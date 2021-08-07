/**
 * WordPress dependencies
 */
import { MenuItem, VisuallyHidden } from '@wordpress/components';
import { external } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { registerPlugin, unregisterPlugin } from '@wordpress/plugins';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import CopyContentMenuItem from './copy-content-menu-item';
import ManageBlocksMenuItem from './manage-blocks-menu-item';
import KeyboardShortcutsHelpMenuItem from './keyboard-shortcuts-help-menu-item';
import ToolsMoreMenuGroup from '../components/header/tools-more-menu-group';

/** @edit-custom-post-type **/
unregisterPlugin( 'edit-post' );

/** @edit-custom-post-type **/
registerPlugin( 'edit-custom-post-type', {
	render() {
		return (
			<>
				<ToolsMoreMenuGroup>
					{ ( { onClose } ) => (
						<>
							<ManageBlocksMenuItem onSelect={ onClose } />
							<MenuItem
								role="menuitem"
								href={ addQueryArgs( 'edit.php', {
									post_type: 'wp_block',
								} ) }
							>
								{ __( 'Manage Reusable blocks' ) }
							</MenuItem>
							<KeyboardShortcutsHelpMenuItem
								onSelect={ onClose }
							/>
							<CopyContentMenuItem />
							<MenuItem
								role="menuitem"
								icon={ external }
								href={ __(
									'https://wordpress.org/support/article/wordpress-editor/'
								) }
								target="_blank"
								rel="noopener noreferrer"
							>
								{ __( 'Help' ) }
								<VisuallyHidden as="span">
									{
										/* translators: accessibility text */
										__( '(opens in a new tab)' )
									}
								</VisuallyHidden>
							</MenuItem>
						</>
					) }
				</ToolsMoreMenuGroup>
			</>
		);
	},
} );
