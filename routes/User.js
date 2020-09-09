const { User } = require('../models/user')
const express = require('express')
const router = express.Router()

router.post('/new', async (req, res) => {
  console.log(req.body)
  let user = await User.findOne({ email: req.body.email })

  if (user) {
    return res
      .status(400)
      .send({ error: true, message: 'User already registered.' })
  }

  user = new User({
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    bluetoothId: req.body.bluetoothId,
  })

  await user.save()

  res.status(200).send(req.body)
})

module.exports = router
