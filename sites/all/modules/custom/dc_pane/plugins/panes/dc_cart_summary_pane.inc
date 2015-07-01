<?php

/**
* This plugin array is more or less self documenting
*/
$plugin = array(
  'single' => TRUE,
  'title' => t('Dc Cart Summary'),
  'category' => array(t('Pizza'), 20),
  'render callback' => 'dc_cart_summary_renderer',
);

/**
 * Rendered for Cart Summary 
 */
function dc_cart_summary_renderer($subtype, $conf, $panel_args, $context = NULL) {
  $pane_title = '';  
  $pizza_title = '';
  // Pizza edit form
  if (arg(0) == 'pizza' && arg(2) == 'edit') {
    $line_item_id = arg(1);
    $line_item = entity_load_single('commerce_line_item', $line_item_id);
    $wrapper = entity_metadata_wrapper('commerce_line_item', $line_item);
    $pizza_title = $wrapper->field_product_display_reference->title->value();
  } 
  // is Node ?
  elseif (arg(0) == 'node' && is_numeric(arg(1))) {
    $nid = arg(1);    
    $node = entity_load_single('node', $nid);
    // is Product display
    if ($node->type == 'product_display') {
      $wrapper = entity_metadata_wrapper('node', $node);
      $pizza_title = $wrapper->title->value();
    }    
  }



  $cart_total = '$0.0';
  $button_title = t('Update pizza');
  if (arg(0) == 'node') {
  	$button_title = t('Add to cart');	
  } 
  
  return (object) array(
    'title' => $pane_title,
    'content' => theme('dc_pane_cart_summary', array(
      'cart_total' => $cart_total,
      'button_title' => $button_title,
      'pizza_title' => $pizza_title,
    )),
  );
}
