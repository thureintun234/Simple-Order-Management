const Customer = require('../models/customer.model')
const Joi = require('joi')

const customerValidation = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
})

const createCustomer = async (req, res) => {
  try {
    const { error } = customerValidation.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, phone, address } = req.body
    const customer = new Customer({ name, phone, address })
    const savedCustomer = await customer.save()

    res
      .status(201)
      .json({ message: 'Customer saved successfully', customer: savedCustomer })
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message })
  }
}

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()

    res.status(200).json({ customers })
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message })
  }
}

const getCustomer = async (req, res) => {
  try {
    const { customerId } = req.params
    const customer = await Customer.findById(customerId)

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' })
    }

    res.status(200).json({ customer })
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message })
  }
}

module.exports = { createCustomer, getAllCustomers, getCustomer }
