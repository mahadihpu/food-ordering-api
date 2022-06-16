const express = require('express')
const bcrypt = require('bcrypt')

const { User, validate } = require('../models/user')
const _ = require('lodash')

const router = express.Router()

const newUser = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('Email already registered')
  user = new User({
    email: req.body.email,
    password: req.body.password,
  })

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  const token = user.generateJWT()

  const result = await user.save()

  return res.status(201).send({
    token: token,
    user: _.pick(result, ['_id', 'email']),
  })
}

const authUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('User not found!!!')
  console.log(req.body.password, user.password)
  const validateUser = await bcrypt.compare(req.body.password, user.password)
  if (!validateUser) return res.status(400).send('Email password doesnt match')
  const token = user.generateJWT()
  res.send({
    token: token,
    user: _.pick(user, ['_id', 'email']),
  })
}
router.route('/').post(newUser)
router.route('/auth').post(authUser)

module.exports = router
