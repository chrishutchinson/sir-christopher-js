/**********************************
 * Hotspot
 *
 * Author: Chris Hutchinson [chris.hutchinson@the-times.co.uk]
 **********************************/

/**
* Language Strings
*/
SirTrevor.Locales.en.blocks.hotspot = {
  'title': 'Hotspot'
};

/**
* Block Config
*/
SirTrevor.Blocks.Hotspot = SirTrevor.Block.extend({
  type: 'hotspot',

  title: function() { return i18n.t('blocks:hotspot:title'); },

  droppable: true,
  uploadable: true,

  icon_name: 'image',

  count: 1,

  loadData: function(data){
    var that = this;

    // If we're loading a blob, set isBlob to true
    var isBlob = (data.file.url.substring(0,4) === 'blob') ? true : false;

    // Create the container for the image and the hotspot overlay
    var imgContainer = $('<div>', {class: 'img-container'}).on('click', function(e) {
      e.preventDefault();
      that.onClickImage(e);
    });

    // Setup the image and add it to the container
    if(isBlob){
      var img = $('<img>', { src: data.file.url, class: 'upload' });
      $(imgContainer).html(img);
    } else {
      var img = $('<img>', { src: rootURL + data.file.url, class: 'upload' });
      $(imgContainer).html(img);
    }

    // Add the hotspot overlay to the container
    var hotspot = $('<div>', { class: 'hotspot-overlay' });
    $(imgContainer).append(hotspot).show();

    // Add the container to the editor
    this.$editor.html(imgContainer).show();

    var itemCount = ((Object.keys(data).length-1)/4);

    var newImg = new Image();
    newImg.src = $(img)[0].src;

    var that = this;

    newImg.onload = function() {
      for(i=1; i<=itemCount; i++) { 
        var dataSet = {};
        dataSet[i + '_headline'] = data[i + '_headline'];
        dataSet[i + '_body'] = data[i + '_body'];

        var coords = {};
        coords['top'] = data[i + '_top'];
        coords['left'] = data[i + '_left'];

        that.addHotspot(dataSet, coords);

        var $container = that.$editor.find('.hotspot-overlay');

        var imgData = {
          height: img.height(),
          width: img.width(),
          naturalHeight: newImg.naturalHeight,
          naturalWidth: newImg.naturalWidth
        };

        var coords = {
          left: data[i + '_left'],
          top: data[i + '_top']
        };

        var decimals = {
          left: coords.left/imgData.naturalWidth,
          top: coords.top/imgData.naturalHeight,
        };

        var click = {
          left: decimals.left * imgData.width,
          top: decimals.top * imgData.height
        };

        var hotspot = $('<div>', {class: 'hotspot', style: 'top: ' + (click.top-15) + 'px; left: ' + (click.left-15) + 'px;'}).html(i);
        
        $container.append(hotspot);

        var draggableHotspot = new Draggabilly(hotspot[0], {
          containment: '.hotspot-overlay'
        });
        draggableHotspot.on('dragEnd', that.updateHotspot);

        ++that.count;
      }
    }
  },

  updateHotspot: function(d, e, p) {
    var that = this;

    var $editor = $(d.element).parent().parent().parent();

    if($editor.hasClass('st-block__editor')) {
      var offset = $(d.element).parent().offset();
      var $parent = $(d.element).parent().parent();
      var image = $parent.find('img.upload')[0];
      console.log(offset);

      if(typeof image !== 'undefined') {
        var img = {
          height: image.height,
          width: image.width,
          naturalHeight: image.naturalHeight,
          naturalWidth: image.naturalWidth
        };

        var click = {
          left: ($(d.element).offset().left+15) - offset.left,
          top: ($(d.element).offset().top+15) - offset.top
        };


        var decimals = {
          left: (click.left/img.width),
          top: (click.top/img.height)
        };

        var coords = {
          left: img.naturalWidth * decimals.left,
          top: img.naturalHeight * decimals.top
        };

        // Add limits
        if(coords.left < 0) {
          coords.left = 0;
        }
        if(coords.left > img.naturalWidth) {
          coords.left = img.naturalWidth;
        }
        if(coords.top < 0) {
          coords.top = 0;
        }
        if(coords.top > img.naturalHeight) {
          coords.top = img.naturalHeight;
        }

        var count = $(d.element).html();

        $editor.find('input[name="' + count +'_top"]').val(coords.top);
        $editor.find('input[name="' + count +'_left"]').val(coords.left);
      }
    } else {
      $editor.find('input[name="' + count +'_top"]').val($(d.element).startPosition.y);
      $editor.find('input[name="' + count +'_left"]').val($(d.element).startPosition.x);
    }
  },

  addHotspot: function(data, coords) {
    if(typeof data.headline === 'undefined'){
      data.headline = [];
    }
    if(typeof data.body === 'undefined'){
      data.body = [];
    }

    // Title
    this.$editor.append($('<h3>', {
      'data-count': this.count,
      style: 'margin-top: 10px;'
    }).html('Hotspot ' + this.count));

    // Headline
    this.$editor.append(
      $('<input>', {
        class: 'st-required st-input-string',
        type: 'text',
        name: this.count + '_headline',
        placeholder: 'Headline',
        style: 'width: 100%; margin-bottom: 10px; border: 1px solid #eaeaea; padding: 10px;',
        value: data[this.count + '_headline'],
        'data-count': this.count
      })
    );

    // Body
    this.$editor.append(
      $('<textarea>', {
        class: 'st-required st-text-block',
        name: this.count + '_body',
        placeholder: 'Body',
        style: 'width: 100%; margin-bottom: 10px; border: 1px solid #eaeaea; padding: 10px;',
        'data-count': this.count
      }).html(data[this.count + '_body'])
    );

    // Coords (left)
    this.$editor.append(
      $('<input>', {
        class: 'st-required st-input-string',
        type: 'hidden',
        name: this.count + '_left',
        value: coords.left,
        'data-count': this.count
      })
    );

    // Coords (top)
    this.$editor.append(
      $('<input>', {
        class: 'st-required st-input-string',
        type: 'hidden',
        name: this.count + '_top',
        value: coords.top,
        'data-count': this.count
      })
    );

    // Divider
    this.$editor.append($('<hr />', {
      'data-count': this.count
    }));
  },

  onClickImage: function(e) {
    var that = this;

    var offset = $(e.target).offset();
    var $parent = $(e.target).parent();
    var image = $parent.find('img.upload')[0];

    if(typeof image !== 'undefined') {
      var img = {
        height: image.height,
        width: image.width,
        naturalHeight: image.naturalHeight,
        naturalWidth: image.naturalWidth
      };

      var click = {
        left: e.pageX - offset.left,
        top: e.pageY - offset.top,
      };

      var decimals = {
        left: (click.left/img.width),
        top: (click.top/img.height)
      };

      var coords = {
        left: img.naturalWidth * decimals.left,
        top: img.naturalHeight * decimals.top
      };

      var hotspot = $('<div>', {class: 'hotspot', style: 'top: ' + (click.top-15) + 'px; left: ' + (click.left-15) + 'px;'}).html(that.count);
      $(e.target).append(hotspot);

      var draggableHotspot = new Draggabilly(hotspot[0], {
        containment: '.hotspot-overlay'
      });
      draggableHotspot.on('dragEnd', this.updateHotspot);

      var data = [];
      that.addHotspot(data, coords);
      ++that.count;
    }
  },

  onBlockRender: function(){
    /* Setup the upload button */
    this.$inputs.find('button').bind('click', function(ev){ ev.preventDefault(); });
    this.$inputs.find('input').on('change', _.bind(function(ev){
      this.onDrop(ev.currentTarget);
    }, this));
  },

  onDrop: function(transferData){
    var file = transferData.files[0],
        urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

    // Handle one upload at a time
    if (/image/.test(file.type)) {
      this.loading();
      // Show this image on here
      this.$inputs.hide();
      this.loadData({file: {url: urlAPI.createObjectURL(file)}});

      this.uploader(
        file,
        function(data) {
          this.setData(data);
          this.ready();
        },
        function(error){
          this.addMessage(i18n.t('blocks:image:upload_error'));
          this.ready();
        }
      );
    }
  }
});