(function($) {		
	var priceTimeout = 500;	

	Drupal.behaviors.dcToppingCartPage = {
		attach: function (context, settings) {			
			$('input.form-text').TouchSpin({
	      		verticalbuttons: true,
	      		min: 1,
	      		max: 20
	    	});

			var totalElement = $('.line-item-total-raw');
			var totalPrice = 0;
	    	$('.views-form-commerce-cart-form-default tr').each(function() {
	    		var price = $(this).find('.total-price').data('amount');
	    		var qty = $(this).find('.views-field-edit-quantity .form-text').val();
	    		totalPrice = price * qty;
	    	});

	    	// format to decimal
			totalPrice = totalPrice / 100;

	    	totalElement.text(totalPrice);

	    	$('.bootstrap-touchspin input.form-control').change(function() {
	    		var qty = $(this).val();
	    		var amountElement = $(this)
	    						.parent().parent()
	    						.parent().parent()
	    						.find('.total-price');
	    		var totalPrice = amountElement.data('amount') / 100 * qty;
	    		totalPrice = '$' + totalPrice.toFixed(2);
	    		setTimeout(function() {
	    			amountElement.text(totalPrice);	    		
	    			cartAPI.calculateTotalPrice();
	    		}, priceTimeout);
	    	});
		}
	};

	var cartAPI = {
		calculateTotalPrice: function() {
			var subTotalTag = $('.component-type-base-price > .component-total');
			var taxTag = $('.component-type-taxtax > .component-total');
			var orderTotalTag = $('.component-type-commerce-price-formatted-amount > .component-total');			
			
			var subTotalValue = 0;
			var taxValue = 0;
			var orderTotalValue = 0;
			var taxRate = Drupal.settings.taxRate;

			// go through table and calculate subtotal by price & qty
			$('.views-form-commerce-cart-form-default .topping-item').each(function() {
				var qty = $(this).find('.bootstrap-touchspin input.form-control').val();
				var price = $(this).find('.total-price').data('amount');
				subTotalValue += (price * qty) / 100;
			});

			// Subtotal
			subTotalTag.text('$' + subTotalValue.toFixed(2));
			// Tax Rate
			taxValue = subTotalValue * taxRate;
			taxTag.text('$' + taxValue.toFixed(2));
			// Order total
			orderTotalValue = subTotalValue + taxValue;
			orderTotalTag.text('$' + orderTotalValue.toFixed(2));
		}
	};

})(jQuery);