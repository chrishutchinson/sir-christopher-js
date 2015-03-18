/**********************************
 * Map
 *
 * Author: Chris Hutchinson [chris.hutchinson@the-times.co.uk]
 **********************************/

/**
* Language Strings
*/
SirTrevor.Locales.en.blocks.cartodbmap = {
  'title': 'CartoDB Map'
};

/**
* Block Config
*/
SirTrevor.Blocks.Cartodbmap = SirTrevor.Block.extend({

  type: 'cartodbmap',

  title: function() { return i18n.t('blocks:cartodbmap:title'); },

  editorHTML: '<h1>' + i18n.t('blocks:cartodbmap:title') + '</h1><ul><li>Enter the CartoDB.js Map URL</li></ul><input type="text" class="st-input-string st-required js-mapid-input" name="mapid" placeholder="CartoDB.js URL" style="width: 100%; margin-top: 10px; text-align: center; border: none; border-bottom: 1px solid #eaeaea;" /><input type="number" min="1" max="10" class="st-input-string st-required js-zoom-input" name="zoom" placeholder="Zoom Level (1-10)" style="width: 100%; margin-top: 10px; text-align: center; border: none; border-bottom: 1px solid #eaeaea;" />',

  icon_name: 'default',

  loadData: function(data){
    this.$editor.prevObject.each(function(index, elem){
      if($(elem).hasClass('js-mapid-input')){
        $(elem).val(data.mapid);
      }
      if($(elem).hasClass('js-zoom-input')){
        $(elem).val(data.zoom);
      }
    });
  },
});