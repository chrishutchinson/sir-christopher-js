var block = new SirTrevorBlock('New Text Block', 'newtextblock');

block.setIcon('text')
      .hideIcon()
      .setAttribute('formattable')
      .setComponent('inlineTextAgain', {
        label: 'BR Text First',
        type: 'textarea',
        nullable: true,
        textMode: 'inline'
      })
      .setComponent('inlineText', {
        label: 'P Text',
        type: 'textarea',
        nullable: true,
        textMode: 'block'
      })
      .buildBlock();

// Setup the block
SirTrevor.Blocks.Newtextblock = block.block;