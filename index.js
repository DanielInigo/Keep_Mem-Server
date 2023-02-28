 const express=require('express');
 const mongoose=require("mongoose");
 const cors=require("cors");
 const app=express()

const ListModel=require("./models/ToDoList")

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGODB_URL);
//.catch((err) => console.log(err)).then((con)=> console.log(con))

app.post("/insert",async(req,res)=>{
    const task=req.body.Task;
    const days=req.body.Time;

    const List=new ListModel({Task:task,Time:days})
    try{
        await List.save();
        res.send("inserted data")
    }catch(err){
        console.log(err)
    }
})

app.get("/read",async(req,res)=>{
    ListModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })

})

app.put("/update",async(req,res)=>{
    const newTask=req.body.newTask;
    const id=req.body.id;
    try{
        await ListModel.findById(id,(err,updateTask)=>{
            updateTask.Task=newTask;
            updateTask.save();
            res.send("data updated")
        })
    }catch(err){
        console.log(err)
    }
})

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    await ListModel.findByIdAndRemove(id).exec();
    res.send("deleted");
})

 app.listen(3001,()=>{
    console.log("Server running on port 3001");
 })
