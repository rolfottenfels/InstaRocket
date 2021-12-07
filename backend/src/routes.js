const express = require('express');
const multer = require('multer'); //Upload de arquivos Multpart Form data
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

// Rotas GET e POSTS dos Posts
routes.get('/posts', PostController.index); 
routes.post('/posts', upload.single('image'), PostController.store); 

// Rota para dar like
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;