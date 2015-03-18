/**********************************
 * News
 *
 * Author: Chris Hutchinson [chris.hutchinson@the-times.co.uk]
 **********************************/

/**
* Language Strings
*/
SirTrevor.Locales.en.blocks.businesseditorspicks = {
  'title': 'Editor\'s Picks'
};

/**
* Block Config
*/
SirTrevor.Blocks.Businesseditorspicks = SirTrevor.Block.extend({

  type: 'businesseditorspicks',

  title: function() { return i18n.t('blocks:businesseditorspicks:title'); },

  icon_name: 'default',

  onBlockRender: function(){
    if(this.$editor[0].children.length == 0){
      this.loadData();
    } 
  },

  loadData: function(data){
    this.$editor.append(
      $('<h1>' + i18n.t('blocks:businesseditorspicks:title') + '</h1><ul><li>Enter the body text</li><li>Enter an optional URL to link to</li></ul>')
    );

    if(typeof data === 'undefined'){
      data = [];
      data.text = '';
      data.url = '';
    }

    var that = this;

    this.$editor.append(
      $('<button>', {
        class: 'st-upload-btn',
        style: 'margin: 0 5px 0 0'
      }).html('Bold').on('click', function(e) {
        e.preventDefault();
        that.addBold(this);
      })
    );

    this.$editor.append(
      $('<button>', {
        class: 'st-upload-btn',
      }).html('Italic').on('click', function(e) {
        e.preventDefault();
        that.addItalics(this);
      })
    );

    this.$editor.append(
      $('<textarea>', {
        class: 'st-required st-text-block',
        name: 'text',
        placeholder: 'Text',
        style: 'width: 100%; min-height: 250px; margin-top: 10px; border: 1px solid #eaeaea; padding: 10px;',
      }).html(data.text)
    );

    this.$editor.append(
      $('<input>', {
        type: 'text',
        class: 'st-text-block',
        name: 'url',
        placeholder: 'URL',
        style: 'width: 100%; border: 1px solid #eaeaea; padding: 10px; margin-top: 10px;',
        value: data.url
      })
    );
  },

  addBold: function(button) {
    var $elem = this.$editor.find('textarea.st-text-block');
    var cursor = $elem[0].selectionStart;
    var cursorEnd = $elem[0].selectionEnd;
    var value = $elem.val();
    
    if(cursorEnd > cursor) {
      $elem.val(value.substring(0, cursorEnd) + '**' + value.substring(cursorEnd));
      value = $elem.val();
    } else {
      if($(button).html() === '/Bold') {
        $(button).html('Bold');
      } else {
        $(button).html('/Bold');
      }
    }
    
    $elem.val(value.substring(0, cursor) + '**' + value.substring(cursor));
  },

  addItalics: function(button) {
    var $elem = this.$editor.find('textarea.st-text-block');
    var cursor = $elem[0].selectionStart;
    var cursorEnd = $elem[0].selectionEnd;
    var value = $elem.val();
    
    if(cursorEnd > cursor) {
      $elem.val(value.substring(0, cursorEnd) + '_' + value.substring(cursorEnd));
      value = $elem.val();
    } else {
      if($(button).html() === '/Italic') {
        $(button).html('Italic');
      } else {
        $(button).html('/Italic');
      }
    }
    
    $elem.val(value.substring(0, cursor) + '_' + value.substring(cursor));
  }
});