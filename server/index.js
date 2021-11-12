const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/key");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/hello", (req, res) => res.send("Hello!"));

app.post("/api/users/register", (req, res) => {
  // 회원가입 할때 필요한 정보들은 client에 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  // 로그인
  // 1. DB안에서 이메일 찾기
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "입력된 이메일에 해당하는 유저가 없습니다",
      });
    }

    // 2. 검증
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 3. 맞다면 토큰 생성
      userInfo.generateToken((err, userInfo) => {
        if (err) return res.status(400).send(err);
        // 토큰을 저장. (쿠키)
        res
          .cookie("x auth", userInfo.token)
          .status(200)
          .json({ loginSuccess: true, userId: userInfo._id });
      });
    });
  });
});

// auth : 미들웨어
// role 1 어드민    role 2 특정 부서 어드민
// role 0 -> 일반유저   role 0이 아니면  관리자
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.userInfo._id,
    isAdmin: req.userInfo.role === 0 ? false : true,
    isAuth: true,
    email: req.userInfo.email,
    name: req.userInfo.name,
    lastname: req.userInfo.lastname,
    role: req.userInfo.role,
    image: req.userInfo.image,
  });
});

const port = 3000;

app.listen(port, () => console.log(`exmaple app listening on port ${port}!`));
