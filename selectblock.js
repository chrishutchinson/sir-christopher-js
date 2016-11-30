var block = new SirTrevorBlock('Select Block', 'selectblock');

block.setIcon('text')
      .setComponent('developer', {
        label: 'Developer',
        type: 'select',
        nullable: true,
        required: true,
        sourceType: 'object',
        source: {
          chris: 'Chris Hutchinson',
          callum: 'Callum Christie',
          aendrew: 'Ændrew Rininsland',
          elliot: 'Elliot Davies',
        }
      })
      .setComponent('developer2', {
        label: 'Developer',
        type: 'select',
        nullable: true,
        required: true,
        sourceType: 'object',
        source: {
          chris: 'Chris Hutchinson',
          callum: 'Callum Christie',
          aendrew: 'Ændrew Rininsland',
          elliot: 'Elliot Davies',
        },
        searchable: true
      })
      .buildBlock();

// Setup the block
SirTrevor.Blocks.Selectblock = block.block;