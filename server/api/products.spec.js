/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const User = db.model('user')

describe('Product routes', () => {
  describe('/api/products/', () => {
    const testTitle = 'Title Of Product'
    const cody = {
      email: 'cody@puppybook.com',
      name: 'Cody',
      isAdmin: true
    }

    beforeEach(() => {
    })

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
      return User.create(cody)
    })

    xit('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal(testTitle + '1')
        })
    })
    xit('GET /api/products/id', () => {
      return request(app)
        .get('/api/products/2')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.be.equal(testTitle + '2')
        })
    })
    xit('/api/admin check if authenticated', async () => {
      const res = await request(app).post('/api/admin/addproduct').expect()
    })

    xit('POST /api/admin/addproduct', async () => {
      const res = await request(app).post('/api/admin/addproduct').expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(cody.email)
      expect(res.body[0].isAdmin).to.be.equal(true)
    })

    xit('PUT /api/admin/editproduct', async () => {
      const res = await request(app).post('/api/admin/editproduct', { id: 1, name: 'editName' }).expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
