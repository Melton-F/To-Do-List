import ToDo from '../toDoModel/toDoModel'

exports.showToDos = async(req, res) => {
    try{
        const toDos = await ToDo.find()
        if (toDos < 1) {
            return res.status(404).json({
              status: "Fail",
              message: "There is no tasks",
            });
          }
        res.status(200).json({
            status: "Success",
            message: "All the toDo list showed",
            no_Of_toDos: toDos.length,
            toDos: toDos,
        });
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err,
        });
    }
};

exports.createToDos = async(req, res)=>{
    try{
        const toDo = await new ToDo({
            user:req.body.user,
            toDos:req.body.toDos,
            taskCreatedAt:req.body.taskCreatedAt,
            taskOn:req.body.taskOn,
            taskDate:req.body.taskDate,
            comment:req.body.comment
        })
        toDo.save().then(response=>{
            res.status(201).json({
                status:"Success",
                createdToDo:toDo
            })
        }).catch(err=>{
            res.status(500).json({
                error:err
            })
        })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err,
        });
    }
}

exports.getToDoById = async(req, res)=>{
    try{
        const toDo = await ToDo.findById(req.params.id)
        res.status(200).json({
            status:"Success",
            toDoTask:toDo
        })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err,
        });
    }
}

exports.updateById = async(req, res)=>{
    try{
        let id = req.params.id
        let updates = req.body
        let options = {new:true}

        console.log(id);
        console.log(updates);
        const toDo = await ToDo.findByIdAndUpdate(id,updates,options)
        // console.log(toDo)
        if(toDo){
            await ToDo.findByIdAndUpdate(id, {updatedAt:new Date}, options).then(result=>{
                // console.log("updated");
                return res.status(200).json({
                    status:"Success",
                    updatedToDo:toDo
                })
            })
            .catch(e=>{
                console.log(e);
            })
        }
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err,
        });
    }
}

exports.addComment = async(req, res)=>{
    try{
        const toDo = ToDo.findById(req.body.id)
        if(toDo){
            ToDo.findByIdAndUpdate(req.body.id, {comment:req.body.comment}, {new:true}).then(doc=>{
                res.status(201).json({
                    status:"Success",
                    message:"comment added",
                    updatedDoc:doc
                })
            })
        }
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err,
        });
    }
}

exports.previousToDos = async(req,res)=>{
    try{
        console.log(req.query);
        const todoByDate = await ToDo.find({taskDate:req.query.taskDate}).populate("user","name")
        res.status(200).json({
            status:"Succcess",
            no_Of_toDo:todoByDate.length,
            todoByDate:todoByDate
        })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err.message,
        });
    }
}


exports.deleteById = async(req, res)=>{
    try{
        const deleteToDo = await ToDo.findByIdAndRemove(req.params.id)
        res.status(204).json({
            status:"Success",
            message:"deleted"
        })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err,
        });
    }
}