/**********************************
 * Times+ Event
 *
 * Author: Chris Hutchinson [chris.hutchinson@the-times.co.uk]
 **********************************/

/**
* Language Strings
*/
SirTrevor.Locales.en.blocks.storymap = {
  'title': 'Storymap'
};

/**
* Block Config
*/
SirTrevor.Blocks.Storymap = SirTrevor.Block.extend({

  type: 'storymap',

  title: function() { return i18n.t('blocks:storymap:title'); },

  icon_name: 'default',

  onBlockRender: function(){
    if(this.$editor[0].children.length == 0){
      this.loadData();
    } 
  },

  loadData: function(data){
    this.$editor.append(
      $('<h1>' + i18n.t('blocks:storymap:title') + '</h1>')
    );

    if(typeof data === 'undefined'){
      data = [];
      data.source = '';
    }

    this.$editor.append(
      $('<input>', {
        type: 'text',
        class: 'st-required st-text-block',
        name: 'source',
        placeholder: 'Source',
        style: 'width: 100%; border: 1px solid #eaeaea; padding: 10px;',
        value: data.source
      })
    );
  },
});