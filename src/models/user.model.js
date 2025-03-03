import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: { type: String, required: function() { return !this.githubId; } },
  last_name: { type: String, required: function() { return !this.githubId; } },
  age: { type: Number, required: function() { return !this.githubId; } },
  password: { type: String, required: function() { return !this.githubId; } },
  email: { type: String, required: true, unique: true },
  role: { type: String, required:true, enum:["admin", "user"], default: "user" },
  userName:{type:String},
  githubId: { type: String },
  url:{type:String},
  location:{type:String},
  company:{type:String},
  cart: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, 
    quantity: { type: Number, default: 1 }, 
    addedAt: { type: Date, default: Date.now } 
  }]
});

export const userModel = model("user", userSchema);

