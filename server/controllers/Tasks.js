const Task = require('@Server/models/Task')
const shortid = require('shortid');

module.exports = {
    async create(req,res){
        try {
            const { name} = req.body
            if(name){
                let newTask = new Task(shortid.generate(),name, new Date(), "active")
                req.db.get('task').push(newTask).write()
                res.status(200).json({message:"Task Successfully Created", data:newTask})
            }else{
                res.status(400).json({message:"Name is empty"})
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message:"Unknown Error"})
        }
    },
    async getAll(req,res){
        try {
            let resultTask = req.db.get('task').value()
            res.status(200).json({message:"Task Successfully Obtained", data:resultTask})
        } catch (error) {
            console.log(error)
            res.status(500).send({message:"Unknown Error"})
        }
    },
    async complete(req,res){
        try {
            const { id } = req.body
            if(id){
                let resultTask = req.db.get('task').find({ id:id}).assign({ state: 'done'}).write()
                if(resultTask){
                    res.status(200).json({message:"Task Successfully Updated", data:resultTask})
                }else{
                    res.status(400).json({message:"Invalid Id"})
                }
            }else{
                res.status(400).json({message:"Id is empty"})
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message:"Unknown Error"})
        }
    }
}