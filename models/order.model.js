const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  shippingFee: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Rejected'],
    default: 'Pending',
  },
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
