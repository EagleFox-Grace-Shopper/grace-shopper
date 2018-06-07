/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Category = db.model('category')

describe('Category model', () => {

  xit('successfully adds a category to the table', async () => {
    let category = await Category.create({ name: 'wacky stuff' })
    expect(category.dataValues.name).to.be.equal('wacky stuff')
  })


  //not working validation tests
  xit('fails when an empty string is supplied for name', () => {
    // let category
    // expect(Category.create({name: ''}).then()).to.throw(Error)
    let category = async function () {
      try {
        await Category.create({ name: '' })
      } catch (err) {
        console.log('got error', err.name)
        return err.name
      }
    }
    console.log('cat funciton', category().then())
    expect(category()).to.throw(Error)
  })


  xit('fails when name is not supplied', () => {
    let category
    Category.create({}).then(cat => {
      category = cat
    })

    expect(category).to.be.an.instanceOf(Error)
  })
})

