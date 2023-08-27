const Order = require('../models/order.model')
const Joi = require('joi')

const orderValidation = Joi.object({
  customer: Joi.string().required(),
  shippingFee: Joi.number().required(),
  orderStatus: Joi.string()
    .valid('Pending', 'Completed', 'Rejected')
    .default('Pending'),
  orderItems: Joi.array().items(Joi.string().required()).required(),
})

const createOrder = async (req, res) => {
  try {
    const { error } = orderValidation.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { customer, shippingFee, orderStatus, orderItems } = req.body

    const order = new Order({ customer, shippingFee, orderStatus, orderItems })
    const savedOrder = await order.save()

    res
      .status(201)
      .json({ message: 'Order saved successfully', order: savedOrder })
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message })
  }
}

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()

    res.status(200).json({ orders })
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message })
  }
}

const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params
    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ messge: 'Order not found.' })
    }

    res.status(200).json({ order })
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message })
  }
}

module.exports = { createOrder, getOrder, getOrders }
