import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },   
  age: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  userName:{type:String, required:true},
  githubId: { type: String },
  url:{type:String,required:true},
  location:{type:String},
  instagram:{type:String},
  company:{type:String}

});

export const userModel = model("user", userSchema);

