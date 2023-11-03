require("dotenv").config(); // 1. 'dotenv' 미들웨어 라이브러리 활용. .env 환경변수 파일에서 환경 변수를 로드. 추 후, 민감 정보를 다룰 때, 환경변수로 등록하면 보안. 관리적 이점을 볼 수 있음.

const express = require("express"); // 2. 'express' node.js기반 웹 애플리케이션을 만들도록 도와주는 프레임 워크.
const logger = require("morgan"); // 3. morgan 미들웨어를 가져옵니다. morgan은 HTTP 요청에 대한 로깅을 제공하는 미들웨어로, 개발 및 디버깅 목적으로 사용됩니다.
const cors = require("cors"); // 4.  미들웨어를 가져옵니다. CORS (Cross-Origin Resource Sharing)를 처리하기 위해 사용됩니다. 다른 도메인에서의 HTTP 요청을 허용하도록 서버를 구성하는 데 도움이 됩니다.

const route = require("./routes");
5;
const DataSource = require("./models/dataSource");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(route);

app.get("/ping", function (req, res) {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await DataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });

  console.log(`server listening on port ${PORT}`);
});
