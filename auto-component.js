// Polymer component data sample
var data = {
  fields: [
    {
      id: 'src',
      name: 'source url',
      type: 'input',
      formatfunc: 'encodeURIComponent',
      selected: 'http://media.transparency.org/maps/cpi2015-940.html'
    },{
      id: 'ratio',
      name: 'width/height ratio',
      type: 'button',
      options: ['21:9','16:9', '4:3', '1:1', '2:3', '1:2'],
      deselect: ['percent'],
      selected: '16:9'
    },{
      id: 'percent',
      name: 'width/height percentage',
      type: 'input',
      format: 'style=\'padding-bottom:{{ value }}%;\'',
      deselect: ['ratio']
    }
  ],
  title: 'Iframe',
  icon: 'competition',
};

var block = new SirTrevorBlock(data.title, data.title.toLowerCase());

block.setIcon(data.icon);

// Iterate over the fields.
for(var x = 0; x<data.fields.length; x++) {
  // Setup the element.
  var element = data.fields[x];

  // Setup a default config object.
  var config = {
    label: element.name,
    default: element.selected || null
  };

  // Switch over the element type to determine the field type in Sir Trevor.
  switch(element.type) {
    case 'input':
      config.type = 'text';
      break;
    case 'button':
      config.type = 'select';
      config.sourceType = 'object';
      config.source = {};

      // Iterate over the potential <select> options.
      for(var y = 0; y<element.options.length; y++) {
        // Setup the option.
        var option = element.options[y];

        // Store the option.
        config.source[option] = option;
      }
      break;
  }

  // Set the component on the card.
  block.setComponent(element.id, config);
}

// Build the block.
block.buildBlock();

// Setup the block.
SirTrevor.Blocks[data.title] = block.block;