const router = require('express').Router()
const { User } = require('../../db/models')

router.get('/', async (req, res, next) => {
  const allUsers = await User.findAll({
    attributes: ['id', 'name', 'address', 'email', 'isAdmin']
  })

  res.json(allUsers)
})

router.get('/:id/edit', async (req, res, next) => {
  const user = await User.findById(req.params.id, {attributes: ['id', 'name', 'address', 'email', 'isAdmin']})
  res.json(user.dataValues)
})

router.put('/:id/edit', async (req, res, next) => {
  const entry = await User.update({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    isAdmin: req.body.isAdmin
  }, {
    where: {id: req.params.id},
    returning: true
  })

  const editedUser = entry[1][0].dataValues
  res.status(201).json(editedUser)
})

router.delete('/:id', async (req, res, next) => {
  await User.destroy({
    where: {
      id: req.params.id
    }
  })
  res.sendStatus(204)
})

module.exports = router
