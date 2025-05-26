const http = require('http')

const server = http.createServer((request, response) =>  {
    response.end("Hola mundo")
})

server.listen(8080, () => {
    console.log("Server runing port 8080")
})