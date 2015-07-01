<ul class="checkout-crumbs">
<?php $first = FALSE; ?>
<?php foreach ($pages as $page) : ?>
	<?php $class = $page['active'] ? drupal_attributes(array('class' => 'active')) : ''; ?>
	<?php if ($first) : ?>
	<li class="sep">&nbsp;</li>
	<?php else : ?>
		<?php $first = TRUE; ?>
	<?php endif; ?>
	<li <?php print $class; ?>>
		<span class="index"><?php print $page['index']; ?></span>
		<?php print $page['title']; ?>
	</li>
<?php endforeach; ?>
</ul>