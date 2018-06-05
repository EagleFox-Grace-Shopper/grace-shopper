/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('products')

describe('Product routes', () => {
  describe('/api/products/', () => {
    const testTitle = 'testTitle'

    beforeEach(() => {
      return Product.create({
        title: testTitle,
        description: 'description text',
        price: 14,
        quantity: 200,
        imageUrl: 'defaultImage.jpg',
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal(testTitle)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
