require('dotenv').config()
process.env.MONGODB_DATABASE = 'task-manager-api-test'

const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Foo Bar',
    email: 'foo@bar.com',
    password: '56what!!'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    await request(app).post('/users')
        .send({
            name: 'Silvio',
            email: 'mail@silvio-gloeckner.de',
            password: 'MyPass777!'
        })
        .expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'wrong@example.com',
        password: 'foobar'
    })
    .expect(401)
})