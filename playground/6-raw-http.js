const https = require('https')

const url = 'https://api.darksky.net/forecast/03c5aad23649cbc65143c286189eb211/40,-75?units=ca'

const request = https.request(url, (response) => {
    let data = ''
    
    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log(error)
})

request.end()