/**********************************
 * oEmbed
 *
 * Author: Chris Hutchinson [chris.hutchinson@the-times.co.uk]
 **********************************/

/**
* Language Strings
*/
SirTrevor.Locales.en.blocks.oembed = {
  'title': 'oEmbed'
};

/**
* Block Config
*/
SirTrevor.Blocks.Oembed = SirTrevor.Block.extend({

  type: 'oembed',

  title: function() { return i18n.t('blocks:oembed:title'); },

  editorHTML: '<h1>' + i18n.t('blocks:oembed:title') + '</h1><ul><li>Enter the URL to embed (e.g. YouTube, SoundCloud, Vimeo)</li></ul><input type="text" class="st-input-string st-required js-url-input" name="url" placeholder="URL" style="width: 100%; margin-top: 10px; text-align: center; border: none; border-bottom: 1px solid #eaeaea;" />',

  icon_name: 'default',

  loadData: function(data){
    this.$editor.prevObject.each(function(index, elem){
      if($(elem).hasClass('js-url-input')){
        $(elem).val(data.url);
      }
    });
  },
});