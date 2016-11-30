var block = new SirTrevorBlock('Repeater', 'repeater');

block.setIcon('list')
      .setAttribute('formattable')
      .setAttribute('uploadable')

      .setComponent('textarea', {
        label: 'Text!',
        type: 'textarea',
        required: true
      })
      .setRepeaterComponent('item', {
      
        aaaa: {
          type: 'text',
          label: 'WowTable',
          required: true
        },
        fdsa: {
          type: 'text',
          label: 'WowTablfdsafdse',
        },
      })
      .buildBlock();

// Setup the block
SirTrevor.Blocks.Repeater = block.block;