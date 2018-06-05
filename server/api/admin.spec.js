/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('Admin routes', () => {
  describe('/api/admin/', () => {
    const cody = {
      email: 'cody@puppybook.com',
      name: 'Cody',
      isAdmin: true
    }

    beforeEach(() => {
      return User.create(cody)
    })

    it('/api/admin check if authenticated', async ()=>{
      const res = await request(app).post('/api/admin/addproduct').expect()
    })

    it('POST /api/admin/addproduct', async () => {
      const res = await request(app).post('/api/admin/addproduct').expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(cody.email)
      expect(res.body[0].isAdmin).to.be.equal(true)
    })

    it('PUT /api/admin/editproduct', async () => {
      const res = await request(app).post('/api/admin/editproduct', {id: 1, name: 'editName'}).expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
