const express = require('express')
const { Order } = require('../models/order')
const authorize = require('../middlewares/authorize')

const router = express.Router()

const newOrder = async (req, res) => {
  const order = new Order(req.body)
  try {
    await order.save()
    return res.status(201).send('Order has been placed')
  } catch (error) {
    return res.status(400).send(error)
  }
}

const orderList = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({
    orderTime: -1,
  })
  try {
    return res.send(orders)
  } catch (error) {
    return res.send('error!! No list found')
  }
}

router.route('/').get(authorize, orderList)
router.route('/newOrder').post(authorize, newOrder)

module.exports = router
