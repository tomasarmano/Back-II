import { Router } from "express";
import {userModel} from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { hashPassword, verifyPassword } from "../utils/password.utils.js";
import passport from "passport";

export const sessionRouter = Router()
const JWT_SECRET='jwt_secreto'


sessionRouter.post("/register",passport.authenticate("register", {
    failureRedirect: "/register?message=fail-register",
    successRedirect: "/login",
  }),
  (req, res) => res.redirect("/login")
);

sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).lean();

  if (!user ){
    return res.redirect("/login?error=Login falló!");
  }
  const token = jwt.sign({ id: user._id, role: user.role, email:user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
    
    res.cookie("currentUser", token, { httpOnly: true, signed: true });
    res.redirect("/current");
  
});

sessionRouter.post("/restore-password",passport.authenticate("restore-password", {
    failureRedirect: "/restore-password",
    }),
    async (req, res) => {
      res.redirect("/login");
    }
);
  
sessionRouter.get("/github", passport.authenticate("github", {scope:['user:email']}), async (req,res)=>{});

sessionRouter.get("/githubcallback", 
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log(req.user);

    if (req.user) {
      const token = jwt.sign(
        { id: req.user._id, role: req.user.role, email: req.user.email },
        JWT_SECRET,
        { expiresIn: "10s" }
      );

      res.cookie("currentUser", token, { httpOnly: true, signed: true });

      req.session.user = req.user;
      return res.redirect("/");
    }

    res.redirect("/login");
  }
);

sessionRouter.delete("/:id", async (req, res) => {

  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado" });
    
  } catch (error) {
    res.status(400).send({
      status: 'error',
      message: error.message
  });
  }

});
