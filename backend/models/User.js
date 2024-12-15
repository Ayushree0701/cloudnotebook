const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
name :{
type : String,
required : true
},
email:{
    type : String,
    required : true,
    unique : true
    
},
password:{
    type : String,
    required : true
},
date : {
    type : Date,
    default : Date.now
}
})
const User = mongoose.model('user',UserSchema);
//as email is kept unique, so indexes will be created according to that
/*User.createIndexes();*/
module.exports = User;