// Default config
    this.defaults = {
      type: this.type,
      title: this.title,
      icon_name: this.icon,
    };

    // Attributes
    if(that.attributes.pastable) {
      this.defaults.pastable = true;
      this.defaults.pasteCallback = that.pasteCallback;
    }
    if(that.attributes.droppable) {
      this.defaults.droppable = true;
    }
    if(that.attributes.formattable) {
      this.defaults.formattable = true;
    }

    // HTML
    if(that.html.paste) {
      this.defaults.paste_options = {
        html: that.html.paste, 
      };
    }

    // Block data
    this.block = SirTrevor.Block.extend(_.extend(this.defaults, {

      editorHTML: '<div><h2>' + this.title + '</h2><hr /></div>',
      
      loadData: function(data) {
        var st = this;

        if (typeof data === 'undefined') { data = {}; }

        $.each(that.components, function(i, e) {
          if(typeof data[i] === 'undefined') { data[i] = ''; }
        });

        this.addComponents(data, that.components);
      },

      addComponents: function(data, components) {
        var st = this;

        if(data[that.pasteTarget] !== '') {
          $.each(components, function(i, e) {
            var $elementWrapper = $('<div>', {
              class: 'st-element',
              style: 'margin-bottom: 10px;'
            });
            var $elementLabel = $('<label>').html(e.label);
            var $element = that.createElement(i, e, data[i]);

            if(e.type === 'textarea') {
              st.text_block = $element;
              st._initTextBlocks();
            }

            $elementWrapper.append($elementLabel).append($element)
            st.$editor.append($elementWrapper);
          });
        }

        that.isRendered = true;
      },

      onBlockRender: function() {
        if(this.$editor[0].children.length == 0){
          this.loadData();
        } 
      },

      onContentPasted: function(event) {
        if(that.pasteTarget) {
          var setDataConfig = {};
          setDataConfig[that.pasteTarget] = event.target.value; 
          
          this.setAndLoadData(setDataConfig);

          this.pasteCallback(event, this);
        }
      },  

      _serializeData: function() {
        if(that.isRendered) {
          var st = this;

          var data = {},
              text = null;

          $.each(that.components, function(i, e) {
            switch(e.type) {
              case 'textarea':
                data[i] = st.$('div[contenteditable][name="' + i + '"]')[0].innerHTML;
                if (data[i].length > 0 && st.options.convertToMarkdown) {
                  data[i] = stToMarkdown(data[i], e.type);
                }
                break;
              default:
                data[i] = st.$('input[name="' + i + '"]').val();
                break;
            }
          });

          return data;
        }
      },
    }));

    return this.block;