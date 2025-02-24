import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userModel } from "../models/user.model.js";
import { hashPassword, verifyPassword } from "../utils/password.utils.js";
import GithubStrategy from "passport-github2"; 

const CLIENT_ID='Iv23litIvbKuK5uZAdAf'
const CLIENT_SECRET_GH='f0614e2618f9ea112b3f2a3266a28c16bc6f00d8'


export function initializePassport() {
  passport.use("register",new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { first_name, last_name, age } = req.body;

        if (!first_name || !last_name || !age)
          return done(null, false, { message: "All fields are required" });
        try {
          const userExists = await userModel.findOne({ email }).lean();
          if (userExists)
            return done(null, false, { message: "User already exists" });

          const hashedPassword = await hashPassword(password);

          const user = await userModel.create({
            first_name,
            last_name,
            age,
            email,
            password: hashedPassword,
          });
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email }).lean();

          console.log(user);

          if (!user) return done(null, false, { message: "User not found" });
          const isPasswordCorrect = await verifyPassword(
            password,
            user.password
          );
          console.log(isPasswordCorrect);

          if (!isPasswordCorrect)
            return done(null, false, { message: "Invalid password" });

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "restore-password",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email }).lean();
          if (!user) return done(null, false, { message: "User not found" });

          const hashedPassword = await hashPassword(password);

          await userModel.updateOne(
            { _id: user._id },
            { password: hashedPassword }
          );
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use("github", new GithubStrategy(
    {
      clientID:CLIENT_ID,
      clientSecret: CLIENT_SECRET_GH,
      callbackURL: "http://localhost:5000/api/sessions/githubcallback",
    },
    async (access_token, refresh_token, profile, done) => {
      try {
        console.log(profile);
        const email = profile.email || "tomi@gmail.com";
        let user = await userModel.findOne({
          email
        });

        if (user) {
          return done(null, user);
        }

        const newUser = await userModel.create({
          name: profile.displayName,
          email,
          userName:profile.username,
          githubId: profile.id,
          url:profile._json.html_url,
          instagram:profile._json.blog,
          company:profile._json.company
        });

        return done(null, newUser); // 👈 Crea un nuevo usuario y finaliza el proceso


      } catch (error) {
        return done(error);
      }

    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
        return done(null, user);
        }catch (error) {
            return done(`Hubo un error: ${error.message}`);
        }
    });
}
