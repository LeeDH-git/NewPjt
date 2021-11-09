const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// DB에 저장하기전에 함수 실행
userSchema.pre("save", function (next) {
  // DB schema를 가리킴
  let user = this;

  if (user.isModified("password")) {
    // 비밀번호를 암호화 시킨다
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
});

//plainPassword 와 DB안의 암호화된 비밀번호와 비교
userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

//jsonwebtoken을 이용해서 웹토큰 생성
userSchema.methods.generateToken = function (callback) {
  let user = this;

  let token = jwt.sign(user._id, "secretToken");
  user.token = token;
  user.save(function (err, userInfo) {
    if (err) return callback(err);
    callback(null, userInfo);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
