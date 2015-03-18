/**********************************
 * Times+ Event
 *
 * Author: Chris Hutchinson [chris.hutchinson@the-times.co.uk]
 **********************************/

/**
* Language Strings
*/
SirTrevor.Locales.en.blocks.timeline = {
  'title': 'Timeline'
};

/**
* Block Config
*/
SirTrevor.Blocks.Timeline = SirTrevor.Block.extend({

  type: 'timeline',

  title: function() { return i18n.t('blocks:timeline:title'); },

  icon_name: 'default',

  onBlockRender: function(){
    if(this.$editor[0].children.length == 0){
      this.loadData();
    } 
  },

  loadData: function(data){
    this.$editor.append(
      $('<h1>' + i18n.t('blocks:timeline:title') + '</h1>')
    );

    if(typeof data === 'undefined'){
      data = [];
      data.source = '';
      data.zoom = '0';
    }

    this.$editor.append(
      $('<input>', {
        type: 'text',
        class: 'st-required st-text-block',
        name: 'source',
        placeholder: 'Source',
        style: 'width: 100%; border: 1px solid #eaeaea; padding: 10px; margin-bottom: 10px;',
        value: data.source
      })
    );

    $select = $('<select>', {
      class: 'st-required st-input-select form-control',
      name: 'zoom',
      style: 'margin-top: 10px;'
    });

    var o = new Option('-- Please Select a Zoom Level --', '');
    $select.append(o);

    var optionList = [
      {
        name: '-5 - Most Zoomed In',
        value: '-5',
      },
      {
        name: '-4',
        value: '-4',
      },
      {
        name: '-3',
        value: '-3',
      },
      {
        name: '-2',
        value: '-2',
      },
      {
        name: '-1',
        value: '-1',
      },
      {
        name: '0 - Default',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5 - Most Zoomed Out',
        value: '5',
      },
    ];

    _.each(optionList, function(elem, index){
      var o = new Option(elem.name, elem.value);
      if(elem.value == data.zoom){
        $(o).prop('selected', true);
      }
      $(o).html(elem.name);
      $select.append(o);
    });

    this.$editor.append($select);
  },
});