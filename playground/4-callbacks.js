const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error!')
        callback(undefined, 'Everything went well!')
    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) throw error

    console.log(result)
})