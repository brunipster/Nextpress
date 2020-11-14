const express = require('express')
const next = require('next')
// const path = require('path')
require('module-alias/register')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require("cors");
const { parse } = require("url");
const middleware = require('@Server/middleware')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
// const verifyJWT = require('@Src/middlewares/verifyJWT')
// const isLocal = process.env.CUSTOM_NODE_ENV === "local";
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({
  dev: true
});

const apiRoutes = require('@Routes/api.routes')
const routes = require('@Routes/routes')

const port = process.env.PORT || 80

nextApp.prepare().then(() => {
    const app = express()
    db.defaults({ task: [], user: []}).write()
    app.use(bodyParser.json())

    app.use("/_next/static", express.static(".next/static"));
    app.use("/static",express.static('./static'));
    
  
    // Register api routes
    Object.keys(apiRoutes).forEach((key, index) => {
      apiRoutes[key].forEach((route) => {
        const {methods ,path ,controller, permissions} = route
        router[methods.toLowerCase()](`/${key}${path}`, middleware(controller,permissions,db))
      })
    })
    app.use('/api', router)
  
  
    // Register web routes
    Object.keys(routes).forEach((key, index) => {
      let route = routes[key] 
      app.get(route.slug, function(req, res){
          const parsedUrl = parse(req.url, true);
          const { query } = parsedUrl;
          console.log(route.view)
          nextApp.render(req,res,route.view, query);
      })
    })
    
    app.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
