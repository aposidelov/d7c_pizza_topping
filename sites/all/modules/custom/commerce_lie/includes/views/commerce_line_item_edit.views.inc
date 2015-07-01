<?php

/**
 * Provide shopping cart related Views integration.
 */

/**
 * Implements hook_views_data_alter().
 */
function commerce_line_item_edit_views_data_alter(&$data) {
	$data['commerce_line_item']['edit_line_item_form'] = array(
		'field' => array(
			'title' => t('Edit Line Item Form'),
			'help' => t('Display an Edit Line Item form for a specific line item.'),
			'handler' => 'commerce_line_item_edit_handler_field_edit_line_item_form',
		),
	);
}