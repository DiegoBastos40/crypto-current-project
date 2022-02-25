const router = require('express').Router();

const User = require('../models/User.model');
const Post = require('../models/Post.model');

router.get('/post-create', (req, res) => {
  User.find()
    .then((dbUsers) => {
      res.render('posts/create', { dbUsers });
    })
    .catch((err) => console.log(`Err while displaying post input page: ${err}`));
});

router.post('/post-create', (req, res, next) => {
  const author = req.session.user._id
  const { title, content } = req.body;

  Post.create({ title, content, author })
    .then((dbPost) => {
      return User.findByIdAndUpdate(author, { $push: { posts: dbPost._id } });
    })
    .then(() => res.redirect('/posts'))
    .catch((err) => next(err));
});

router.get('/posts', (req, res, next) => {

  Post.find()
    .populate('author')
    .then((dbPosts) => {
      console.log(dbPosts);
      res.render('posts/list', { posts: dbPosts });
    })
    .catch((err) => next(err));
});
router.get('/posts/:id', (req, res, next) => {
  const { id } = req.params;

  Post.findById(id)
    .populate('author comments')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User',
      },
    })
    .then((foundPost) => {
      console.log(foundPost);
      res.render('posts/details', foundPost);
    })
    .catch((err) => next(err));
});

module.exports = router;