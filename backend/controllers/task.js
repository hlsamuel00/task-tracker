import Task from '../models/Task.js'

export default {
    getTasks: async(req,res) => {
        console.log(req.user)
        try {
            const tasks = await Task.find({ user: req.user.id }).lean()

            res.status(200).send(tasks)
        
        } catch(err){
            console.error(err)
        }
    },
    getTask: async (req,res) => {
        try{
            const task = await Task.findById(req.params.id).lean()

            res.status(200).send(task)

        } catch(err){
            console.error(err)
        }
    },
    createTask: async (req,res) => {
        try{
            const task = await Task.create({
                text: req.body.text,
                day: req.body.day,
                reminder: req.body.reminder,
                user: req.user.id
            })
            
            console.log('Task created.')
            res.status(200).send(task)

        } catch(err){
            console.error(err)
        }
    },
    updateReminder: async (req,res) => {
        try {
            const task = await Task.findOneAndUpdate({ _id: req.params.id }, { 
                $set: { reminder: { $eq: [ false, '$reminder']} } 
            }, { returnNewDocument: true }).lean()

            console.log('Reminder updated.')
            res.status(200).send(task)

        } catch(err){
            console.error(err)
        }
    },
    deleteTask: async (req,res) => {
        try{
            await Task.findOneAndDelete({ _id: req.params.id })
            console.log('Task deleted.')
            res.status(200)
        } catch(err){
            console.error(err)
        }
    }
}