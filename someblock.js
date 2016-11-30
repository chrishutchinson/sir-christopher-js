var block = new SirTrevorBlock('Some Block', 'someblock');

block.setAttribute('droppable')
      .setAttribute('uploadable')
      .setIcon('text')
      .setProperty('minimisable')
      .setUploadableComponent('image', {
        label: 'Image',
        default: null
      }, function(event, st) {
        console.log(event, st);
      })
      .setComponent('size', {
        label: 'Size',
        type: 'number',
        placeholder: 'Enter the size here',
        min: 0,
        max: 10,
        step: 0.1,
        default: 5.5,
        callbacks: {
          keyup: function(e, st) {
            console.log('keyup', e, st);
          },
          click: function(e, st) {
            console.log('clicky', e, st);
          }
        }
      })
      .setComponent('textarea', {
        label: 'Text!',
        type: 'textarea',
      })
      .setComponent('byline', {
        label: 'Byline',
        type: 'select',
        sourceType: 'ajax',
        source: 'http://times.deck.dev:8000/api/lists',
      })
      .buildBlock('Someblock');

// Setup the block
SirTrevor.Blocks.Someblock = block.block;