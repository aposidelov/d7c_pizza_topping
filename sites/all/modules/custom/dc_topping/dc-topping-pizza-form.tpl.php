<?php print drupal_render($product_ref_element); ?>
<table class="e-pizza-toppings">	
	<tr class="e-pizza-size e-pizza-size-header">
		<td></td>
		<td><strong><strong>Pick a size</strong></td>
		<td><strong><strong>Price</strong></td>
		<td><strong><strong>Quantity</strong></td>
	</tr>
	<tr class="e-pizza-size topping-item">
		<td><?php print drupal_render($size_image_element); ?></td>
		<td><?php print drupal_render($size_element); ?></td>
		<td><?php print drupal_render($size_price_element); ?></td>
		<td><?php print drupal_render($quantity_element); ?></td>			
	</tr>
	<tr class="e-pizza-size">
		<td></td>
		<td><strong>Ingridients</strong></td>
		<td><strong></strong></td>
		<td><strong></strong></td>
	</tr>	
	<?php foreach (element_children($checkboxes_element) as $checkbox) : ?>				
		<tr class="topping-item">
			<td><?php print drupal_render($image_element[$checkbox]); ?></td>
			<td><?php print drupal_render($checkboxes_element[$checkbox]); ?></td>
			<td><?php print drupal_render($price_element[$checkbox]); ?></td>
			<td><?php print drupal_render($qtys_element[$checkbox]); ?></td>			
		</tr>
	<?php endforeach ?>
	
</table>
<?php print drupal_render_children($form); ?>
