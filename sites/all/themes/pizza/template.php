<?php

/**
 * @file
 * Template overrides as well as (pre-)process and alter hooks for the
 * Sushi theme.
 */

/*
function pizza_preprocess_panels_pane(&$vars) {
	dsm($vars);
	$pane_name = $vars['pane']->subtype;
  if ($pane_name == 'menu-menu-footer-menu') { 
    $vars['template_files'][] = 'panels-pane-YOURTEMPLATE';
  }
    
}
*/

/**
 * Implements hook_preprocess_LAYOUT-NAME_layout().
 */
function pizza_preprocess_main_layout(&$variables) {	
	//$variables['cart_total'] = dc_get_cart_total();	  	
}

/**
 * Implements hook_form_alter().
 */
function pizza_form_alter(&$form, &$form_state, $form_id) {

	if ($form_id == 'commerce_checkout_form_checkout') {		
		$form['buttons']['continue']['#suffix'] = '
			<div id="floatingBarsG" class="element-invisible">
				<div class="blockG" id="rotateG_01"></div>
				<div class="blockG" id="rotateG_02"></div>
				<div class="blockG" id="rotateG_03"></div>
				<div class="blockG" id="rotateG_04"></div>
				<div class="blockG" id="rotateG_05"></div>
				<div class="blockG" id="rotateG_06"></div>
				<div class="blockG" id="rotateG_07"></div>
				<div class="blockG" id="rotateG_08"></div>
			</div>';
	}  
}

/**
 * Implements hook_preprocess_html().
 */
function pizza_preprocess_html(&$variables) {	
	//dsm($variables);
	$theme_settings = variable_get('theme_pizza_settings', array());
	$variables['logo'] = file_create_url($theme_settings['logo_path']);
	$variables['front_page'] = '/';
	$variables['cart_total'] = dc_get_cart_total();
}

