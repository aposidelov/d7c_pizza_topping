(function($) {	
	var priceTimeout = 500;	
	var pizzaFormAPI = {};	
	Drupal.behaviors.dcTopping = {
		attach: function (context, settings) {					
			if ($('body.node-type-product-display').length) {
				$('.pane-dc-cart-summary-pane').addClass('sticky').addClass('add-to-cart');
			}			
			//
			$('#edit-quantity').TouchSpin({
	      		verticalbuttons: true,
	      		min: 1,
	      		max: 20
	    	});
	    	//
	    	$('input.topping-qty').TouchSpin({
	      		verticalbuttons: true,
	      		min: 0,
	      		max: 5,	      		
	    	});	    		    	

			//console.log($('.l-header').height());
			var offset = $('.l-header').height() + $('.pane-commerce-cart-cart').height() + 80;
			//$('.pane-dc-cart-summary-pane').affix({ offset : { top: offset } });
			//$('.pane-dc-cart-summary-pane').affix({ top: 100, bottom: 200 });

			$(window).scroll(function() {				
		    	pizzaFormAPI.stickyPane();($('.pane-dc-cart-summary-pane'));
			});

			// submit a ("Add to cart" / "Update") button			
			$('.e-pizza-form-submit').click(function() {				
				$('.dc-product-pizza-form').submit();
			});			

			//			
			pizzaFormAPI.calculateTotalPrice();			

			var sizeData = Drupal.settings.sizeData;
			var toppingPrices = Drupal.settings.toppingPrices;
			
			var pizzaSize = $('.e-pizza-toppings .form-select');
			// any checkbox clicking handler
			$('.e-pizza-toppings .form-checkbox').change(function() {
				var qtyTextfield = $(this).parent().parent().parent().find('input.form-text');
				if ($(this).is(":checked")) {					
					var pizzaSizeValue = pizzaSize.val();	
					//setTimeout(function() {		
						switch (pizzaSizeValue) {
						    case '6':
					        	qtyTextfield.val(1);
					        	break;
						    case '7':
					        	qtyTextfield.val(2);
					        	break;
						    case '8':
					        	qtyTextfield.val(3);
					        	break;
				        }
		      		//}, priceTimeout);					
				} else {					
					//setTimeout(function() {
						qtyTextfield.val(0);
					//}, priceTimeout);
				}
				pizzaFormAPI.calculateTotalPrice();
				$('.pane-dc-cart-summary-pane').addClass('blocked').addClass('sticky');
			});
			// pizza size selectbox changing hanlder
			pizzaSize.change(function() {
				var pizzaSizeId = $(this).val();	
				var pizzaPrevSizeId = $(this).data('size-prev');				
				$(this).data('size-prev', pizzaSizeId);
				var pizzaSizePriceElement = $(this).parent().parent().parent().find('.ingredient-price');				
				var pizzaSizeImageElement = $(this).parent().parent().parent().find('.image');
				pizzaSizePriceElement.text(sizeData[pizzaSizeId]['formattedAmount']);				
				pizzaSizeImageElement.removeClassPrefix('size-');
				pizzaSizeImageElement.addClass('size-' + pizzaSizeId);				


				// go through all toppings and update defaults qtys
				$('.e-pizza-toppings .topping-item').each(function() {
					var pizzaToppingRow = $(this);					
					var qty = pizzaToppingRow.find('.topping-qty').val();
					var prevSizeQty = getDefQtyBySizeId(pizzaPrevSizeId);
					var currentSizeQty = getDefQtyBySizeId(pizzaSizeId);
					// if current Qty = Prev Default Size Qty - update current q
					// ty in switched value of Default Size Qty
					if (qty == prevSizeQty) {
						pizzaToppingRow.find('.topping-qty').val(currentSizeQty);
					}
				});
				//pizzaSizeImageElement.attr('src', sizeData[pizzaSizeValue]['imageUrl']);

				pizzaFormAPI.calculateTotalPrice();
				$('.pane-dc-cart-summary-pane').addClass('blocked').addClass('sticky');
			});

			// any topping qty textfield changing handler
			$('#edit-quantity, .e-pizza-toppings .topping-qty').change(function() {				
				pizzaFormAPI.calculateTotalPrice();
				$('.pane-dc-cart-summary-pane').addClass('blocked').addClass('sticky');
			});

			$('input.topping-qty').change(function() {
	    		var value = $(this).val();
	    		var checkbox = $(this).parent().parent().parent().parent().find('input.form-checkbox');
	    		setTimeout(function() {
		    		if (value == 0 && checkbox.is(':checked') == true ||
		    			value > 0 && checkbox.is(':checked') == false) {		    				
		    			checkbox.trigger('click');		    			
		    		}	  
	    		}, priceTimeout);    			  		    	
	    	});
		}
	};	

	pizzaFormAPI = {
		calculateTotalPrice: function() {
			var pizzaQty = $('#edit-quantity').val();
			var sizeData = Drupal.settings.sizeData;
			var toppingPrices = Drupal.settings.toppingPrices;
			var totalPrice = 0;
			var pizzaSizeRow = $('.e-pizza-size');		
			var size_tid = pizzaSizeRow.find('select').val();
			console.log(sizeData);
			totalPrice += parseInt(sizeData[size_tid]['amount']);		
			$('.e-pizza-toppings .topping-item').each(function() {
				var pizzaToppingRow = $(this);			
				var amount = pizzaToppingRow.find('.ingredient-price').data('amount');
				var qty = pizzaToppingRow.find('.topping-qty').val();						
				if (isNumeric(amount) && isNumeric(qty)) {
					totalPrice += amount * qty;
				}			
			});				
			// Total Price x Qty
			totalPrice = totalPrice * pizzaQty;
			// format to decimal
			totalPrice = totalPrice / 100;

			setTimeout(function() {	
				$('.e-price_total_display').text(sizeData[size_tid]['currency'] + totalPrice.toFixed(2));
			}, priceTimeout);
		},
		stickyPane: function(element) {
			var stickyNavTop = 10; //$('.nav').offset().top;
			var scrollTop = $(window).scrollTop();
			
			if (element.hasClass('blocked') || element.hasClass('add-to-cart')) {
				return;
			}

			if (scrollTop > stickyNavTop) { 
			    element.addClass('sticky');
			} else {
			    element.removeClass('sticky'); 
			}
		}		
	};	

	$.fn.removeClassPrefix = function(prefix) {
	    this.each(function(i, el) {
	        var classes = el.className.split(" ").filter(function(c) {
	            return c.lastIndexOf(prefix, 0) !== 0;
	        });
	        el.className = $.trim(classes.join(" "));
	    });
	    return this;
	};

	getDefQtyBySizeId = function(sizeId) {
		return Drupal.settings.sizeData[sizeId]['qty'];
	};

	function isNumeric(input)	{
	  return (input - 0) == input && (''+input).trim().length > 0;
	}

})(jQuery);