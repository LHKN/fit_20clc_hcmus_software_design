const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.clearCookie('user');
  return res.redirect('/');
})

module.exports = router;