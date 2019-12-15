// Object property shorthand

const name = 'Silvio'
const userAge = 40

const user = {
    name,
    age: userAge,
    location: 'Radebeul'
}

console.log(user)

// Object desctucturing

const product = {
    label: 'Red Notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const { label: productLabel, stock, rating = 5 } = product

// console.log(productLabel, stock, rating)

const transaction = (type, { label, stock = 0 } = {}) => {
    console.log(type, label, stock)
}

transaction('order', product)

transaction('order')