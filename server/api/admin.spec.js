/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const User = db.model('user')

describe('Admin API routes', () => {
  describe('/api/admin/products/', () => {
    let userAgent
    const testTitle = 'Title Of Product'
    const admin = {
      email: 'andrew@puppybook.com',
      name: 'Andrew',
      isAdmin: true
    }
    const nonAdmin = {
      email: 'cody@puppybook.com',
      name: 'Cody',
      isAdmin: false
    }

    const addProduct1 = {
      title: 'addProduct1',
      description: 'description text 1',
      price: 11,
      quantity: 201,
      imageUrl: 'defaultImage.jpg',
    }

    beforeEach(async () => {
      await Product.create({
        title: testTitle + '1',
        description: 'description text 1',
        price: 11,
        quantity: 201,
        imageUrl: 'defaultImage.jpg',
      })
      await Product.create({
        title: testTitle + '2',
        description: 'description text 2',
        price: 12,
        quantity: 202,
        imageUrl: 'defaultImage2.jpg',
      })
      await Product.create({
        title: testTitle + '3',
        description: 'description text 3',
        price: 13,
        quantity: 203,
        imageUrl: 'defaultImage3.jpg',
      })
      await User.create(admin)
      await User.create(nonAdmin)
      userAgent = request.agent()
    })

    xit('/api/admin check if authenticated', () => {
      userAgent
        .post('/api/admin/products/add', addProduct1)
        .send(admin)
        .end((err, res) => {
          if (err) {
            throw err
          }
          expect(res.statusCode).to.equal(201)
        })
      // const unAuthRes = await userAgent.post('/api/admin/products/add', addProduct1).send(nonAdmin)
      expect(userAgent.statusCode).to.equal(201)
      // expect(unAuthRes.statusCode).to.equal(403)
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
