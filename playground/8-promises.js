const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('Everything went well!')
        reject('This is my error!')
    }, 2000)
})

doWorkPromise.then((resolve) => {
    console.log(resolve)
}).catch((reject) => {
    console.log(reject)
})