var block = new SirTrevorBlock('Highcharts Cloud', 'highchartscloud');

block.setAttribute('pastable')
      .setIcon('text')
      .setPastableComponent('highchart', {
          label: 'HighChart ID',
          type: 'text',
          placeholder: 'Enter your HighChart ID here',
          default: null
        }, function(event, st) {
          st.$editor.append($('<div>', {
            id: 'highcharts-' + event.target.value
          }).html('<script src="http://cloud.highcharts.com/inject/' + event.target.value + '" defer="defer"></script>'));
        })
      .buildBlock();


// Setup the block
SirTrevor.Blocks.Highchartscloud = block.block;