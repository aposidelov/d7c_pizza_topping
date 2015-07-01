<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
//dpm(get_defined_vars());
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php foreach ($rows as $id => $row): ?>	
	<?php if (arg(0) == 'pizza' && 
		arg(1) == $view->result[$id]->commerce_line_item_field_data_commerce_line_items_line_item_)	: ?>
		<?php $classes_array[$id] .= ' active'; ?>
	<?php endif; ?>

  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
    <?php print $row; ?>
  </div>
<?php endforeach; ?>
