/**********************************
 * oEmbed
 *
 * Author: Chris Hutchinson [chris.hutchinson@the-times.co.uk]
 **********************************/

/**
*****
** THIS BLOCK HAS THE FOLLOWING REQUIREMENTS
** - Jquery-oembed-all (https://github.com/nfl/jquery-oembed-all)
*****
**/

/**
* Language Strings
*/
SirTrevor.Locales.en.blocks.oembed = {
  'title': 'oEmbed',
  'paste': 'Paste your URL here'
};

/**
* Block Config
*/
SirTrevor.Blocks.Oembed = SirTrevor.Block.extend({

  type: 'oembed',
  pastable: true,
  droppable: true,

  title: function() { return i18n.t('blocks:oembed:title'); },

  icon_name: 'default',

  drop_options: {
    html: '<div class="st-block__message" style="text-align: center; width: 80%; margin: 0 auto;"><p>oEmbed will automatically handle the embedding of your media content (a list of sites you can embed from can be found <a href="https://github.com/nfl/jquery-oembed-all#current-3rd-party-sources-include">here</a>).</p><p>Just supply a normal link below and the rest will be taken care of.</p></div>',
  },

  paste_options: {
    html: '<input type="text" placeholder="<%= i18n.t("blocks:oembed:paste") %>" class="st-block__paste-input st-paste-block">',
  },

  loadData: function(data) {
    if (typeof data === 'undefined') { data = {}; }
    if (typeof data.url === 'undefined') { data.url = ''; }
    this.$inner.find('iframe').remove();

    this.addOembed(data.url);
  },

  onBlockRender: function(){
    if(this.$editor[0].children.length == 0){
      this.loadData();
    } 
  },

  onContentPasted: function(event) {
    this.addOembed(event.target.value);

    this.setAndLoadData({
      url: event.target.value
    });
  },  

  addOembed: function(value) {
    if(value !== '') {
      var $anchor = $('<a>', {
        href: value
      });

      this.$inputs.hide();
      this.$editor.html($anchor).show();

      // Oembed-ify the URL
      $anchor.oembed();
    }
  }  
});