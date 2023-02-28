const mongoose=require('mongoose')

const ListSchema=new mongoose.Schema({
    Task:{
        type:String,
        required: true,
    },
    Time: {
        type:Number,
        required:true,
    }
});

const List=mongoose.model("List",ListSchema)
module.exports=List