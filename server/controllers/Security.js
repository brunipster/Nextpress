var jwt = require('jsonwebtoken');
const shortid = require('shortid');

module.exports = {
    async register(req,res){
        const {email, password} = req.body
        let body = {email, password}
        body.id = shortid.generate()
        body.rol = "admin";
        req.db.get('user').push(body).write();
        res.status(200).json({message:"User Successfully Created", data:body})
    },

    async authenticate(req,res){
        const {email, password} = req.body
        const user = req.db.get('user').find({ email, password}).value()
        if(user){
            var Jwtoken = jwt.sign({ user:user.id }, 'shhhhh', {expiresIn:"10m"});
            res.status(200).send(Jwtoken)
        }else{
            res.status(400).json({message:"User not found"})
        }
    }
}