// Assertions
const chai = require('chai')
const expect = chai.expect
import Category from './category'


describe('Category model', () => {
  describe('Validations', () => {
    it('requires name', async () => {
      const category = Category.build()

      try {
        await category.validate()
        throw Error('validation was successful but should have failed without `name`')
      }
      catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })
  })
})
