const router = require('express').Router()
const {
  createCustomer,
  getAllCustomers,
  getCustomer,
} = require('../controllers/customer.controller')

router.post('/', createCustomer)
router.get('/', getAllCustomers)
router.get('/:customerId', getCustomer)

module.exports = router
