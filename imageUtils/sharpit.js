const sharp = require('sharp');

sharp('input.png')
  .resize(200,300,{
      fit:'outside'
  })
  .toFormat('jpeg')
  .toFile('output.png')
  .then(() => {
    console.log('What to do here?')
  })
  .catch( (err) => {
      console.log(err)
  } );