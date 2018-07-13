var express = require('express');
var router = express.Router();
var Memo = require('../models/memo')

/* GET memo listing. */
router.get('/', async function(req, res) {
  // TODO: get memos by userId
  var memos = await Memo.find({}).exec();
  
  //console.log(memos);
  res.render('memo/index', {
    memos: memos,
    user: req.user,
  });
});


/* GET new memo screen. */
router.get('/new', function(req, res) {
  res.render('memo/new',{});
});

/* POST new memo. */

router.post('/new', async function(req, res) {
  await new Memo({
    userId: req.user.id,
    title: req.body.title,
    text: req.body.text,
  }).save();
  res.redirect('/memo');
});

router.get('/edit/:id',function(req,res){
  Memo.findById(req.param.id);
  res.render('memo/edit');
});

router.post('/edit/:id',function(req, res){
  var memo = {};
  memo.userId=req.user.id;
  memo.title=req.body.title;
  memo.text=req.body.text;

  var query={_id :req.param.id}
  Memo.update(query,memo);
  res.redirect('/memo');
});


module.exports = router;
