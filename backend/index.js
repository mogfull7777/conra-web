const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const cors = require("cors");

const { User } = require("./models/userlist");

// application/x-www-form-urlencoded
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트의 호스트 주소
    credentials: true, // 쿠키를 다루기 위해 필요
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// 서버 실행시 페이지
app.get("/", (req, res) => res.send(`여기는 백엔드 서버 포트${port}입니다.`));

// ________회원가입시
app.post("/api/users/register", async (req, res) => {
  // 회원 가입 시 필요한 정보를 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  // body parser를 통해 body에 담긴 정보를 가져온다.
  const user = new User(req.body);

  // mongoDB 메서드, user모델에 저장.

  try {
    await user.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

// ________로그인시
app.post("/api/users/login", async (req, res) => {
  try {
    // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 2. 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    const isMatch = await user.comparePassword(req.body.password);

    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
        // error: error,
      });
    }

    // 3. 비밀번호 까지 맞다면 토큰 생성.
    const token = await user.generateToken();
    // !!!!!!!!!!!여기서 잘못된듯!!!!! tokenInCookies: token을 활용하자!
    // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등에 저장 가능. (여기선 쿠키)
    res.cookie("user_auth", token).status(200).json({
      loginSuccess: true,
      userId: user._id,
      tokenInCookies: token,
      name: user.name,
      email: user.email,
    });
    console.log("Token from cookie:", token);
  } catch (err) {
    res.status(400).send(err);
    console.log("error : ", err);
  }
});

// 인증처리인 auth.

app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말.

  try {
    const { _id, role, email, image } = req.user;
    res.status(200).json({
      _id,
      isAdmin: role !== 0,
      isAuth: true,
      email,
      role,
      image,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "서버 오류가 발생했습니다." });
  }
});

// ________로그아웃

app.get("/api/users/logout", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });

    // 쿠키에서 토큰을 제거
    res.cookie("user_auth", "", {
      httpOnly: true, // JS를 통한 접근 방지
      expires: new Date(0), // 쿠키 만료 날짜를 과거로 설정
      secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서만 secure 쿠키 사용
    });

    // 성공 응답 전송
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    // 오류 처리 및 오류 응답 전송
    res.status(400).json({ success: false, error: "로그아웃에 실패했습니다." });
    console.log("로그아웃에 실패했습니다.", error);
  }
});

app.listen(port, () => console.log(`Example app listrning on port ${port}!!!`));
