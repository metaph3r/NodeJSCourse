require('dotenv').config()
process.env.MONGODB_DATABASE = 'task-manager-api-test'

const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
    await request(app).post('/users')
        .send({
            name: 'Silvio',
            email: 'mail@silvio-gloeckner.de',
            password: 'MyPass777!'
        })
        .expect(201)
})