(function($) {
  
  SirTrevor.config.defaults.formatBar.commands.push({
    cmd: 'insertUnorderedList',
    name: 'Insert Unordered List',
    text: '•',
    title: 'insertunorderedlist',
  });

  new SirTrevor.Editor({
    el: $('.js-st-instance'),
    blockTypes: [
      'Cartodb',
      'Oembed',
      'Someblock',
      'Mediaheader',
      'Repeater',
      'Selectblock',
      'Text',
      'List',
      'Table',
      'Newtextblock',
      'Highchartscloud',
      'Iframe'
    ],
  });

  SirTrevor.setDefaults({
    uploadUrl: '/attachments.php'
  });

  $('.submit').on('click', function(e) {
    e.preventDefault();

    // Skip validaton for now, we're just saving as we're going
    //SirTrevor.SKIP_VALIDATION = true;

    // Store the current set of cards
    SirTrevor.onBeforeSubmit();

    // Grab the data
    var json = SirTrevor.getInstance().store.retrieve();

    // Turn validation back on
    SirTrevor.SKIP_VALIDATION = false;

    $('.output').html(
      JSON.stringify(json, null, ' ')
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
    );
  });
})(jQuery);