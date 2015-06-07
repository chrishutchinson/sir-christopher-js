(function($) {
  new SirTrevor.Editor({
    el: $('.js-st-instance'),
    blockTypes: [
      'Cartodb',
      'Oembed'
    ]
  });

  $('.submit').on('click', function(e) {
    e.preventDefault();

    // Skip validaton for now, we're just saving as we're going
    SirTrevor.SKIP_VALIDATION = true;

    // Store the current set of cards
    SirTrevor.onBeforeSubmit();

    // Grab the data
    var json = SirTrevor.getInstance().store.retrieve();

    // Turn validation back on
    SirTrevor.SKIP_VALIDATION = false;

    $('.output').html(JSON.stringify(json, null, ' '));
  });
})(jQuery);