const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username:{
      type:String,
      min:[4,'TooShort'],
      max:[32,'To Long']
  },
  email:{
    type:String,
    min:[4,'TooShort'],
    max:[32,'To Long'],
    unique:true,
    lowercase:true,
    required:'Email is Required',
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password:{
      type:String,
      min:[4,'TooShort'],
      max:[32,'To Long'],
      required:'Password is Required'
  },
  stripeCustomerId:String,
  revenue:Number,
  rentals:[{type:Schema.Types.ObjectId,ref:'Rental'}],
  bookings:[{type:Schema.Types.ObjectId,ref:'Booking'}]
});

UserSchema.methods.hasSamePassword=function(requestPassword){
  return bcrypt.compareSync(requestPassword,this.password)


}

UserSchema.pre('save',function(next){
  const user=this
  bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(user.password,salt,function(err,hash){
      user.password=hash
      next()
    })
  })
})



module.exports=mongoose.model('User',UserSchema)