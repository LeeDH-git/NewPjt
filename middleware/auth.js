const { User } = require("../models/User");
let auth = (req, res, next) => {
  // 인증 처리
  // 클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;

  // 토큰 복호화하고 유저를 찾음

  // 유저가 있으면 인증 O / 없으면 인증 X
};

module.exports = { auth };
