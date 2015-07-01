<h3 class="pizza-title"><?php print $pizza_title; ?></h3>
<div class="total"><span class="total-label">Total:</span><span class="total-price e-price_total_display"><?php print $cart_total; ?></span></h3>
<button class="e-pizza-form-submit"><?php print $button_title; ?></button>
<?php print l(t('Find another pizza'), 'pizza-list', array('attributes' => array('id' => 'more-pizza'))); ?>