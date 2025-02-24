import { Router } from "express";
import {userModel} from '../models/user.model.js';
import { hashPassword, verifyPassword } from "../utils/password.utils.js";
import passport from "passport";

export const sessionRouter = Router()

sessionRouter.post("/register",passport.authenticate("register", {
    failureRedirect: "/register?message=fail-register",
    successRedirect: "/login",
  }),
  (req, res) => res.redirect("/login")
);

sessionRouter.post("/login",passport.authenticate("login", {failureRedirect: "/loginFail"}),(req, res) => {
    console.log(req.user);

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
    };
    res.redirect("/profile");
  }
);

sessionRouter.post("/restore-password",passport.authenticate("restore-password", {
    failureRedirect: "/restore-password",
    }),
    async (req, res) => {
      res.redirect("/login");
    }
);
  
sessionRouter.get("/github", passport.authenticate("github", {scope:['user:email']}), async (req,ress)=>{});

sessionRouter.get("/githubcallback",passport.authenticate("github", { failureRedirect: "/login" }),async(req, res) =>{
    console.log(req.user);

    if (req.user) {
      req.session.user = req.user;
      return res.redirect("/");
    }

    res.redirect("/login");
  }
);

sessionRouter.get("/logout", (req,res)=>{
  req.session.destroy()
  res.redirect("/")
})