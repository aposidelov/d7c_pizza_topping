<?php

/**
 * Field handler to present an add to cart form for the product..
 */
class commerce_line_item_edit_handler_field_edit_line_item_form extends views_handler_field {
  function construct() {
    parent::construct();

    $this->additional_fields['line_item_id'] = 'line_item_id';
    $this->real_field = 'line_item_id';
  }

  function option_definition() {
    $options = parent::option_definition();
    $options['line_item_type'] = array('default' => 'product');
    $options['exclude_fields'] = array('default' => array());
    return $options;
  }

  /**
   * Provide the add to cart display options.
   */
  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    // Add a conditionally visible line item type element.
    $types = commerce_product_line_item_types();

    if (count($types) > 1) {
      $type = !empty($this->options['line_item_type']) ? $this->options['line_item_type'] : 'product';
      $form['line_item_type'] = array(
        '#type' => 'select',
        '#title' => t('Add to Cart line item type'),
        '#options' => array_intersect_key(commerce_line_item_type_get_name(), drupal_map_assoc($types)),
        '#default_value' => $type,
      );
    }
    else {
      $type = current($types);
      $form['line_item_type'] = array(
        '#type' => 'hidden',
        '#value' => current($types),
      );
    }
    $options = array();
    foreach (field_info_instances('commerce_line_item', $type) as $field_name => $field) {
      if (strstr($field_name, 'field_') !== FALSE) {
        $options[$field_name] = $field['label'];
      }
    }
    $form['exclude_fields'] = array(
      '#type' => 'checkboxes',
      '#options' => $options,
      '#title' => t('Exclude fields'),
      '#default_value' => $this->options['exclude_fields'],
    );
  }
  function query() {
    $this->ensure_my_table();
    $this->add_additional_fields();
  }
  function render($values) {
    // Output a special placeholder which will be replaced with the actual form
    // in views_form().
    return '<!--form-item-' . $this->options['id'] . '--' . $this->view->row_index . '-->';
  }
  function views_form(&$form, &$form_state) {
    // The view is empty, abort.
    if (empty($this->view->result)) {
      return;
    }
    $form[$this->options['id']] = array(
      '#tree' => TRUE,
    );
    // Don't show interal line item fields.
    $hidden_fields = array(
      'commerce_unit_price',
      'commerce_total',
      'commerce_product',
      'commerce_display_path',
    );
    $hidden_fields += $this->options['exclude_fields'];
    // At this point, the query has already been run, so we can access the
    // results in order to get the base key value.
    foreach ($this->view->result as $row_id => $row) {
      $line_item = commerce_line_item_load($this->get_value($row, 'line_item_id'));
      // We may be displaying multiple line item edit forms so we have to
      // make sure we give each one a unique #parents attribute to avoid naming
      // collisions in $form_state['values'].
      $form[$this->options['id']][$row_id] = array('#parents' => array($this->options['id'] . '-' . $row_id));
      // Let the field API attach the appropriate widgets to our empty form.
      field_attach_form('commerce_line_item', $line_item, $form[$this->options['id']][$row_id], $form_state, LANGUAGE_NONE);
      foreach ($hidden_fields as $hidden_field) {
        // Make sure none of the hidden fields are accessible.
        $form[$this->options['id']][$row_id][$hidden_field]['#access'] = FALSE;
      }
    }
  }
  // Optional validate function.
  function views_form_validate($form, &$form_state) {
    global $user;
    if($user->uid == 8){
      // Pretty-print variable to 'message' area of page with Krumo
      //dpm($form_state['values'], $name = NULL);
    }
    //$field_name = $this->form_element_name();
    //foreach ($form_state['values'][$field_name] as $row_id => $value) {
    //}
  }
  function views_form_submit($form, &$form_state) {
    $field_name = $this->options['id'];
    foreach (element_children($form[$field_name]) as $row_id) {
      $line_item_form = $form[$field_name][$row_id];
      if ($line_item = commerce_line_item_load($line_item_form['#entity']->line_item_id)) {
        entity_form_submit_build_entity('commerce_line_item', $line_item, $line_item_form, $form_state);
        if ($line_item->quantity === 0) {
          $order = commerce_order_load($form_state['order']->order_id);
          commerce_cart_order_product_line_item_delete($order, $line_item->line_item_id);
        }
        else {
          commerce_line_item_save($line_item);
          entity_get_controller('commerce_line_item')->resetCache(array($line_item->line_item_id));
        }
      }
    }
  }
}
