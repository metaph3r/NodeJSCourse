const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0) return reject('You can only add positive numbers')
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    sum = await add(1, -2)
    sum2 = await add(sum, 3)

    return sum2
}

doWork().then((result) => {
    console.log(result)
}).catch((e) => {
    console.error(e)
})