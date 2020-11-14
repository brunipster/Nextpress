const jwt = require('jsonwebtoken')


async function validateRoleUser(id, roles, req, res) {
  try {
      const user = req.db.get('user').find({ id }).value()
      if(user){
          if(roles.includes(user.rol)){
              return true
          }else{
              res.status(401).send("Access Denied");
          }
      }else{
          res.status(404).send("User not found");
      }
  } catch (error) {
      res.status(500).send("Unexpected Error");
  }
}

function executeService(fn,req, res, next){
  const routePromise = fn(req, res, next)
  if (routePromise.catch) {
      routePromise.catch(err => {
          console.log(err)
          return res.status(500).json({message: "Unexpected Error"});
      })
  }
}

module.exports = function (fn,permissions,db) {
  return async (req,res,next) => {
    req.db = db;
    if(permissions.length > 0){
      const Jwtoken = req.headers["x-access-token"];
        if(!Jwtoken) return res.status(403).json({message: "No token provided"});
        try {
          const decodedToken= jwt.verify(Jwtoken,"shhhhh");
          const resultValidateUser = await validateRoleUser(decodedToken.user,permissions,req, res);
          if(resultValidateUser){
              executeService(fn,req, res, next);
          }
        } catch (error) {
          switch(error.name){
            case "JsonWebTokenError":
                return res.status(403).send("Token malformed");
            case "TokenExpiredError":
                return res.status(403).send("Token Expired");
            default:
                console.error("[ERROR]:Controller Error",error.message)
                return res.status(500).json("Unexpected Error");
          }
        }
    }else{
      executeService(fn,req, res, next);
    }
  }
}