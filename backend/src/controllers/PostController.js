const Post = require('../models/Post');
const sharp = require('sharp'); // image edit
const path = require('path'); // path handle
const fs = require('fs'); // file sistem

module.exports = {
  async index(req, res) { // Lista todos os Post ordenado pelo mais recente primeiro
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  }, 

  async store(req, res) { // Cadastra os Posts na Base de Dados
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.'); // separa nome e extensão
    const filename = `${name}.jpg`;

    // Redimensiona imagem do Post para 500px, salva em JPG
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', filename)
      )

      fs.unlinkSync(req.file.path); // Deleta imagem original

    const post = await Post.create({ 
      author, 
      place, 
      description,
      hashtags, 
      image: filename,
     });

     req.io.emit('post', post); // Envia post em tempo real para todos os usuários conectados

    return res.json({ post });
  }
}