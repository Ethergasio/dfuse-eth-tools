const server = require("./src/server")
server.listen(process.env.PORT,() => {
  console.log("Api started listening on port "+ process.env.PORT)
})