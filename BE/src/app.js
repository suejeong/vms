const express = require("express");
const cors = require("cors");
const mainRouter = require("./modules/index.module");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: [
      "https://vms-lyart-chi.vercel.app",
      "http://localhost:5173",
      "https://vms-y50c.onrender.com",
    ],
  })
);
app.use(express.json());
app.use("/", mainRouter);

// 메인 페이지 - 서버 상태 확인용
app.get("/", (req, res) => {
  res.send("Express 서버가 정상적으로 실행 중입니다!");
});

// 서버 실행
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행됩니다.`);
});
