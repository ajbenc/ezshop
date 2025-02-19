const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, clearCart } = require('../controllers/cartController');
const { authenticate } = require('../utils/authMiddleware');

router.get('/', authenticate, getCart);
router.post('/', authenticate, addToCart);
router.delete('/:productId', authenticate, removeFromCart);
router.delete('/', authenticate, clearCart);

module.exports = router;