/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  describe('/api/products/', () => {
    const testTitle = 'Title Of Product'

    beforeEach(() => {
      Product.create({
        title: testTitle + '1',
        description: 'description text 1',
        price: 11,
        quantity: 201,
        imageUrl: 'defaultImage.jpg',
      })
      Product.create({
        title: testTitle + '2',
        description: 'description text 2',
        price: 12,
        quantity: 202,
        imageUrl: 'defaultImage2.jpg',
      })
      Product.create({
        title: testTitle + '3',
        description: 'description text 3',
        price: 13,
        quantity: 203,
        imageUrl: 'defaultImage3.jpg',
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal(testTitle + '1')
        })
    })
    it('GET /api/products/id', () => {
      return request(app)
        .get('/api/products/2')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.be.equal(testTitle + '2')
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
