<div class="l-wrapper">
  <div class="l-page">
  	<header class="l-header" role="header">    
      <div class="l-header-left">
        <?php print render($page['header_left']); ?>      
      </div>
      <div class="l-header-right">
      <?php print render($page['header_right']); ?>        
      </div>
    </header>
    <div class="l-center">  	
    	<?php print render($page['center']); ?>
    </div>    
  </div>
  <footer class="l-footer" role="footer">
    <div class="l-footer-inner">
      <?php print render($page['footer']); ?>  
      <div class="copyright">© 2013 - Sushi Shop</div>
    </div>
  </footer>
</div>

