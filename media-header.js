var block = new SirTrevorBlock('Media Header', 'mediaheader');

block.setIcon('text')
      .setAttribute('uploadable')
      .setAttribute('formattable')
      .setProperty('minimisable')
      .setIcon('fa-chrome')
      .setComponent('media', {
        type: 'file',
        label: 'Media',
        required: true
      }, function(event, st) {
        console.log(event, st);
      })
      .setComponent('headline', {
        label: 'Headline',
        type: 'text',
        placeholder: 'Enter the headline here',
        required: true
      })
      .setComponent('textarea', {
        label: 'Caption',
        type: 'textarea',
        required: true
      })
      .setComponent('test', {
        label: 'Test',
        type: 'textarea',
        required: true
      })
      .setComponent('select1', {
        label: 'Select',
        type: 'select',
        required: true,
        sourceType: 'object',
        source: {
          meow: 'lol',
          bob: 'Cat',
          dog: 'Ron'
        },
        default: 'bob'
      })
      .buildBlock();

// Setup the block
SirTrevor.Blocks.Mediaheader = block.block;