import mongoose from 'mongoose'

const toDoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User"
    },
    toDos:{
        type:String,
        required:true
    },
    taskCreatedAt:{
        type:String,
        default:new Date()
    },
    taskOn:{
        type:String,
    },
    taskDate:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        default:null
    },
    status:{
        type:String,
        enum:["Unstarted", "Pending", "Completed"],
        default:"Unstarted"
    },
    updatedAt:{
        type:String,
        default:null
    }
},
// {timestamps:true}
)

const ToDo = mongoose.model('Todo', toDoSchema)

module.exports = ToDo