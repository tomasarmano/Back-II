import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: { type: String, required: true }, 
  last_name: { type: String, required: true }, 
  age: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  userName:{type:String},
  githubId: { type: String },
  url:{type:String},
  location:{type:String},
  instagram:{type:String},
  company:{type:String}
});

export const userModel = model("user", userSchema);

