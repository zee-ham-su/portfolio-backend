const { Router } = require('express');
const router = Router
const authController = require('../controllers/authController');

router.get('/signup', () => {});
router.post('/signup', () => {});
router.get('/login', () => {});
router.post('/login', () => {});

module.exports = router;