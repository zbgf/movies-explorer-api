const router = require('express').Router();
const {
  getUserById,
  updateProfile,
} = require('../controllers/users');
const { validationProfile } = require('../utils/validation');

router.get('/users/me', getUserById);
router.patch('/users/me', validationProfile, updateProfile);

module.exports = router;
