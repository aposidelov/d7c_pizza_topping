/**
 * @file
 * Javascript.
 */
(function ($) {
  Drupal.behaviors.toaster2 = {
    attach: function(context) {
      $(".toast").not('.processed').addClass('processed').fadeIn().delay(3000).fadeOut(400, function(){$(this).remove()});
    }
  }
})(jQuery);
