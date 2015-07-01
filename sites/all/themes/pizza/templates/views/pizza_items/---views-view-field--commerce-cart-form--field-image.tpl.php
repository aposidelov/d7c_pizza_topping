<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */

$image_style = $row->field_field_image[0]['rendered']['#image_style'];
$uri = $row->field_field_image[0]['raw']['uri'];
$url = image_style_url($image_style, $uri);
$plus_offer = $row->field_field_plus_offer[0]['raw']['value'];
$attributes['class'][0] = 'sushi_item-image';

if ($plus_offer) {
	$attributes['class'][1] = 'sush_item-plus_offer';
}

$title = $row->field_sushi_items_commerce_product_title;
$nid = $row->field_sushi_items_commerce_product_nid;
//print l(theme('image', array('path' => $url, 'title' => $title)), 'node/'.$nid, array('html' => TRUE));
?>
<div <?php print drupal_attributes($attributes); ?>>
	<?php print theme('image', array('path' => $url, 'title' => $title)); ?>
</div>
