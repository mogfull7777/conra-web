const { User } = require("../models/userlist");

let auth = async (req, res, next) => {
  try {
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.user_auth;
    console.log("Token from cookie:", token);
    if (!token) {
      return res
        .status(401)
        .json({ isAuth: false, error: true, message: "No token provided." });
    }

    // 토큰을 복호화(디코딩) 한 후 유저를 찾는다.
    const user = await User.findByToken(token);
    if (!user) {
      return res
        .status(401)
        .json({ isAuth: false, error: true, message: "Invalid token." });
    }

    // 유저가 존재하면 req 객체에 유저 정보와 토큰을 추가
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    // 에러 처리
    res.status(400).json({
      isAuth: false,
      error: true,
      message: error.message,
      chack: "에러",
    });
  }
};

module.exports = { auth };
