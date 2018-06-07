/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db/index')
const app = require('../../index')
const Product = db.model('product')
const User = db.model('user')

describe('Admin API routes', () => {
  describe('/api/admin/products/', () => {
    const userAgent = request.agent(app)
    const unAuthRequest = request(app)

    const testTitle = 'Title Of Product'
    const admin = {
      email: 'andrew@puppybook.com',
      name: 'Andrew',
      password: '1',
      isAdmin: true
    }
    const nonAdmin = {
      email: 'cody@puppybook.com',
      name: 'Cody',
      password: '1',
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
      await db.sync({ force: true })
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
      const res = await userAgent
        .post('/auth/login')
        .send(admin)
      expect(res.statusCode).to.equal(200)
    })

    it('admin check if authenticated', async () => {
      const adminResponse = await userAgent.post('/api/admin/products/add').send(addProduct1)
      const unAuthResponse = await unAuthRequest.post('/api/admin/products/add').send(addProduct1)

      expect(adminResponse.statusCode).to.equal(201)
      expect(unAuthResponse.statusCode).to.equal(403)
    })

    it('POST /api/admin/products/add', async () => {
      const res = await userAgent.post('/api/admin/products/add').send(addProduct1)
      expect(res.body).to.be.an('object')
      expect(res.body.title).to.be.equal(addProduct1.title)
    })

    it('PUT /api/admin/products/:edit', async () => {
      const res = await userAgent.put('/api/admin/products/1').send(addProduct1)
      expect(res.body).to.be.an('object')
      expect(res.body.title).to.be.equal(addProduct1.title)
    })
  })
})
