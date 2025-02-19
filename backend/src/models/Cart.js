const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true }, // FakeStore API product ID
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);