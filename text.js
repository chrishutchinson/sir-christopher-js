var block = new SirTrevorBlock('Text', 'texttext');

block.setIcon('text')
      .setComponent('textarea', {
        label: 'Text!',
        type: 'textarea',
        required: true,
      })
      .buildBlock();

// Setup the block
SirTrevor.Blocks.Texttext = block.block;