const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const UserService = require("../services/User.service");
const jwtConfig = require("../config/jwtConfig");
const generateTokens = require("../utils/generateTokens");
// =============================================================================================================
authRouter.post("/reg", async (req, res) => {
  const { name, email, password } = req.body;
    
  try {
    if (!name.trim() || !email.trim() || !password.trim()) {
      res.status(400).json({
        message: "Нам очень нужен твой email или пароль!!! Ну пожалуйста! ",
      });
    } else {
     
      const hashPassword = await bcrypt.hash(password, 10);

      const user = await UserService.createUser({
        name,
        email,
        password: hashPassword,
      });
      // console.log(user, "USERRRRRR")

      

  

      const tmpUser = user.get();
      delete tmpUser.password;

       
      const { accessToken, refreshToken } = generateTokens({ user: tmpUser });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      });
      res.status(201).json({ user: tmpUser, accessToken });
    }
  } catch (error) {
    // console.log(user, "user");
    res.status(500).json({ message: error.message });
  }
});

// =============================================================================================================
authRouter.post("/log", async (req, res) => {
  const { email, password } = req.body;
   
  try {
    if (!email.trim() || !password.trim()) {
      res.status(400).json({
        message: "Введите логин или пароль ",
      });
    } else {
      const user = await UserService.getUserByEmail(email);
        //  console.log(user, "USER FROM LOGIN SERV")

      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const tmpUser = user.get();
        delete tmpUser.password;
        
        const { accessToken, refreshToken } = generateTokens({ user: tmpUser });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: jwtConfig.refresh.expiresIn,
        });

        res.status(201).json({ user: tmpUser, accessToken });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// =============================================================================================================

authRouter.delete("/logout", async (req, res) => {
  res.clearCookie("refreshToken")
  res.status(200).json({
    message: "Logout success"
  });
});

module.exports = authRouter;
