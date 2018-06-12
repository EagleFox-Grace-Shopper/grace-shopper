const router = require('express').Router()
const { User } = require('../../db/models')

router.get('/', async (req, res, next) => {
  const allUsers = await User.findAll({
    attributes: ['id', 'name', 'address', 'email', 'isAdmin']
  })

  res.json(allUsers)
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
