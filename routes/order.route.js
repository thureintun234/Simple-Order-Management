const router = require('express').Router()
const {
  createOrder,
  getOrder,
  getOrders,
} = require('../controllers/order.controller')

router.post('/', createOrder)
router.get('/', getOrders)
router.get('/:orderId', getOrder)

module.exports = router
