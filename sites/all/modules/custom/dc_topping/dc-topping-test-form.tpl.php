111

<table>
	<tr>
	<?php foreach (element_children($form['toppings']) as $checkbox) : ?>		
		<td><?php print drupal_render($form['toppings'][$checkbox]); ?></td>
	<?php endforeach ?>
	</tr>
</table>
<?php print drupal_render($form['toppings']); ?>

<?php print drupal_render_children($form); ?>
1112