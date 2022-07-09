const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const auth_userId = require('../middleware/auth_userId');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, auth_userId, multer, sauceCtrl.modifySauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.delete('/:id', auth, auth_userId, sauceCtrl.deleteSauce);

module.exports = router;