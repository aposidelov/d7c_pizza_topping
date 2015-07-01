<?php

/**
* This plugin array is more or less self documenting
*/
$plugin = array(
  'single' => TRUE,
  'title' => t('Dc Cart Crumbs'),
  'category' => array(t('Pizza'), 20),
  'render callback' => 'dc_cart_crumbs_renderer',
);

/**
 * Rendered for Cart Crumbs 
 */
function dc_cart_crumbs_renderer($subtype, $conf, $panel_args, $context = NULL) {
  $pane_title = '';  
    
  $checkout_pages = dc_checkout_active_pages(); //commerce_checkout_pages();
  
  $index = 1;
  $pages = array('cart' => array('title' => 'Your cart', 'active' => TRUE, 'index' => $index));
  foreach ($checkout_pages as $page) {
    $index++;
    $pages[$page['page_id']] = array('title' => $page['title'], 'active' => FALSE, 'index' => $index);    
  }

  $current_page = 'cart';
  // get current page (checkout can be empty)
  if (arg(0) == 'checkout') {
    $current_page = arg(2);
    if (empty($current_page)) {
      $current_page = 'checkout';
    }
  }
  // get current index
  $current_index = $pages[$current_page]['index'];
  $index = 1;
  // make all pages active till current index
  foreach ($pages as &$page) {
    if ($page['index'] <= $current_index) {
      $page['active'] = TRUE;
    }

    $index++;
  }

  return (object) array(
    'title' => $pane_title,
    'content' => theme('dc_pane_cart_crumbs', array(
      'pages' => $pages,
    )),
  );
}
