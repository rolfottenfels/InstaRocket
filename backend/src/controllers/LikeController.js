const Post = require('../models/Post');

module.exports = {
  async store(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1; // Adiciona likes

    await post.save();

    req.io.emit('like', post); // Retorna os likes em tempo real
 
    return res.json(post);
  }
}