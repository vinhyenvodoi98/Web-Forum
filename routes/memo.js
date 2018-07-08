var express = require('express');
var router = express.Router();
var Memo = require('../models/memo')

/* GET memo listing. */
router.get('/', async function(req, res) {
  // TODO: get memos by userId
  var memos = await Memo.find({}).exec();
  console.log(memos);
  res.render('memo/index', {
    memos: memos,
  });
});

/* GET new memo screen. */
router.get('/new', function(req, res) {
  res.render('memo/new');
});

/* POST new memo. */
router.post('/new', async function(req, res) {
  console.log(req.body);
  await new Memo({
    title: req.body.title,
    text: req.body.text,
  }).save();
  res.redirect('/memo');
});

module.exports = router;
