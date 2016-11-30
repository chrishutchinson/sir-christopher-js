var block = new SirTrevorBlock('Table', 'table');

block.setIcon('text')
      .setIcon('fa-chrome')
      .setComponent('table', {
        label: 'FTSE tables',
        type: 'table',
        tableConfig: {
          startRows: 5,
          startCols: 2,
          minCols: 2,
          maxCols: 2,
          colHeaders: ['Name', '% Change'],
          colWidths: 300,
          minSpareRows: 1,
          contextMenu: false,
        },
        default: [[]]
      })
      .setComponent('table2', {
        label: 'Markets Today',
        type: 'table',
        tableConfig: {
          startRows: 5,
          startCols: 2,
          minCols: 2,
          maxCols: 2,
          colHeaders: ['Name', 'Value', '% Change'],
          colWidths: 200,
          minSpareRows: 1,
          contextMenu: false,
        },
        default: [
          ['FTSE 100', null, null],
          ['FTSE 250', null, null],
          ['Cac', null, null],
          ['Dax', null, null],
          ['Brent Crude', null, null],
          ['Gold', null, null],
        ]
      })
      .buildBlock();

// Setup the block
SirTrevor.Blocks.Table = block.block;