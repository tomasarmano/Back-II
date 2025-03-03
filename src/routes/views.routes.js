import { Router } from "express";
import jwt from 'jsonwebtoken';

export const viewsRouter = Router()
const JWT_SECRET='jwt_secreto'

const authenticate = (req, res, next) => {
    const token = req.signedCookies.currentUser;
    if (!token) return res.redirect("/login");
  
    try {
      req.user = jwt.verify(token, JWT_SECRET);
      next();
    } catch {
      res.redirect("/login");
    }
  };
  

viewsRouter.get('/',(req,res)=>{
    const isSession = req.session.user ? true : false
    res.render("index", {title: 'inicio', isSession})
});

viewsRouter.get("/login", (req, res) => {
  if (req.signedCookies.currentUser) return res.redirect("/current");
  res.render("login");
});

viewsRouter.get('/register', (req,res)=>{
    const isSession = req.session.user ? true : false
    if(isSession) return res.redirect('/profile')
    res.render('register', {title: 'Registro'})
});

viewsRouter.get('/profile', (req,res)=>{
    const isSession = req.session.user ? true : false
    if(!isSession) return res.redirect('/login')
    res.render('profile', {title:'Perfil', user: req.session.user})
});

viewsRouter.get("/restore-password", (req, res) => {
    const isSession = req.session.user ? true : false; 
    if (isSession) return res.redirect("/profile");
    res.render("restore-password", { title: "Restablecer contraseña" });
});

viewsRouter.get("/current", authenticate, (req, res) => {
  res.render("profile", { user: req.user });
});


viewsRouter.get("/logout", (req,res)=>{
  req.session.destroy();
  res.clearCookie("currentUser");
  res.redirect("/");
})
