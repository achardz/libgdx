const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const app2 = express()
const http = require( 'http' )
const https = require( 'https' )
const fs = require('fs'); 
const path = require('path'); 
const redirectSSL = require('redirect-ssl')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
module.exports = app

async function start() {
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server
  const httpsconfig = {
    key: fs.readFileSync(path.resolve(__dirname, '.././boxza_co_th.key')),
    cert: fs.readFileSync(path.resolve(__dirname,'.././boxza_co_th.crt'))
  }
  app.use(nuxt.render)
  //let server = https. createServer(httpsconfig, app)
  const builder = new Builder(nuxt)
  builder.build()


  // Listen the server
  app2.use(redirectSSL.create({ redirectPort: 443 }))
  //app.listen(port, host)
  http.createServer(app2).listen(80)
  https.createServer(httpsconfig, app).listen(443)
  // Init Nuxt.js
  /*const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })*/
}
start()
