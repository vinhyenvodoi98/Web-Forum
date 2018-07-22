var express = require('express');
var router = express.Router();
var Memo = require('../models/memo');
var Post = require('../models/post');

/* GET memo listing. */
router.get('/', async function(req, res) {
  var memos = await Memo.find({}).exec();
  var posts = await Post.find({}).exec();
  res.render('memo/index', {
    memos: memos,
    user: req.user,
    posts: posts,
  });
});

/* POST new memo. */

router.get('/newpost', function(req, res) {
  res.render('memo/newpost');
});

router.post('/newpost', async function(req,res){
  await new Post({
    userId : req.user.id,
    userName : req.user.name,
    title : req.body.title,
    text : req.body.text,
  }).save();
  res.redirect('/memo');
});

router.get('/postedit/:id',function(req, res){
  res.render('memo/edit');
});

router.post('/postedit/:id',function(req, res){
  var post = {};
  post.title=req.body.title;
  post.text=req.body.text;

  var query={
    _id :req.params.id,
    userId:req.user.id,
  }
  Post.update(query,post, function(err){
    if (err){
      console.log(err);
    }else{
      res.redirect('/memo');
    }
  });
});

router.get('/post/:id',function(req, res){
  res.render('memo/remove');
})

//delete cmt
router.post('/post/:id',function(req,res){
  Memo.findOneAndRemove({
    postId : req.params.id
  }),(err)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/memo');
    }
  }
  Post.findOneAndRemove({
    _id: req.params.id,
    userId : req.user.id,
  },(err)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/memo');
    }
  });
});

/* GET new memo screen. */
router.get('/comment/:id', function(req, res) {
  res.render('memo/comment');
});

router.post('/comment/:id', async function(req, res) {
  await new Memo({
    userId: req.user.id,
    userName: req.user.name,
    postId: req.params.id,
    title: req.body.title,
    text: req.body.text,
  }).save();
  res.redirect('/memo');
});

router.get('/edit/:id',function(req, res){
  res.render('memo/edit');
});

router.post('/edit/:id',function(req, res){
  var memo = {};
  memo.title=req.body.title;
  memo.text=req.body.text;

  var query={
    _id :req.params.id,
    userId:req.user.id,
  }
  Memo.update(query,memo, function(err){
    if (err){
      console.log(err);
    }else{
      res.redirect('/memo');
    }
  });
});

router.get('/:id',function(req, res){
  res.render('memo/remove');
})

router.post('/:id',function(req,res){
  Memo.findOneAndRemove({
    _id: req.params.id,
    userId : req.user.id,
  },(err)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/memo');
    }
  });
});


module.exports = router;
