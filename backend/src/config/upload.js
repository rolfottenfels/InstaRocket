const multer = require('multer');
const path = require('path');

module.exports = {
  storage: new multer.diskStorage({ 
    destination: path.resolve(__dirname, '..', '..', 'uploads'), // Configura a pasta de destino ao salvar as imagens
    filename: function(req, file, cb) {  
      cb(null, file.originalname); // Salva imagem no nome original
    }
  })
};
