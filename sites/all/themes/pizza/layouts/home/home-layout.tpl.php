<div class="l-top">
  <?php print render($page['top']); ?>
</div>
<div class="l-main">
  <div class="l-content" role="main">
    <a id="main-content"></a>
    <?php print render($title_prefix); ?>
    <?php if ($title): ?>
      <h1><?php print $title; ?></h1>
    <?php endif; ?>
    <?php print render($title_suffix); ?>
    <?php print $messages; ?>
    <?php print render($tabs); ?>
    <?php print render($page['help']); ?>
    <?php if ($action_links): ?>
      <ul class="action-links"><?php print render($action_links); ?></ul>
    <?php endif; ?>
    <?php print render($page['center']); ?>
    <?php print $feed_icons; ?>
  </div>
</div>

