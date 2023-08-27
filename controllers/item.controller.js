const Item = require('../models/item.model')
const Joi = require('joi')

const itemValidation = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  size: Joi.string().required(),
  quantity: Joi.number().required(),
})

const createItem = async (req, res) => {
  try {
    const { error } = itemValidation.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, price, size, quantity } = req.body

    const item = new Item({ name, price, size, quantity })

    if (req.file) {
      const { filename } = req.file
      item.image = filename
    }

    const savedItem = await item.save()
    return res
      .status(201)
      .json({ item: savedItem, message: 'Item Created Successfully' })
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message })
  }
}

const getItems = async (req, res) => {
  try {
    const items = await Item.find()

    res.status(200).json({ items })
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message })
  }
}

const getItem = async (req, res) => {
  try {
    const { itemId } = req.params

    const item = await Item.findById(itemId)
    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    res.status(200).json({ item })
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message })
  }
}

module.exports = { createItem, getItem, getItems }
