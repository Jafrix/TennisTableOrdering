require("dotenv").config();
const tokensRoute = require("express").Router();
const jwt = require("jsonwebtoken");
const verifyRefreshToken = require("../middleware/verifyRefreshToken");
const generateTokens = require("../utils/generateTokens");
const jwtConfig = require("../config/jwtConfig");

tokensRoute.get("/refresh", verifyRefreshToken, async (req, res) => {
  
  const user = res.locals.user;
  const { accessToken, refreshToken } = generateTokens({ user });

  if (!user) {
    res.clearCookie();
    res.json({ user: null });
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: jwtConfig.refresh.expiresIn,
  });
  return res.json({ user, accessToken });
});

module.exports = tokensRoute;
