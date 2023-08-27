const router = require('express').Router()
const {
  createItem,
  getItem,
  getItems,
} = require('../controllers/item.controller')
const getMulterMiddleware = require('../middleware/upload.middleware')

router.post('/', getMulterMiddleware('items').single('fileUpload'), createItem)
router.get('/', getItems)
router.get('/:itemId', getItem)

module.exports = router
