(function($) {
  Drupal.behaviors.adminMenu = {
    attach: function (context, settings) {
      $( "body" ).bind( "click", "a", function( event ) {
        event.preventDefault();
      });

      $('.ajax_button').bind("click", function() {
        $.getJSON(Drupal.settings.basePath + 'js/ts_js_test/ts_somefunction', function(result) {
          console.log(result.data);
        });

      });
    }
  }
})(jQuery);
