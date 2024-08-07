const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const getChartData = async (releaseDts, movieNm) => {
  try {
    const response = await axios.get(
      `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${process.env.KMDB_API_KEY}&releaseDts=${releaseDts}&query=${movieNm}`
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

const getDetailInfo = async (release, moviename) => {
  try {
    const response = await axios.get(
      `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${process.env.KMDB_API_KEY}&releaseDts=${release}&title=${moviename}`
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

const getSearchData = async (title) => {
  try {
    const response = await axios.get(
      `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${process.env.KMDB_API_KEY}&title=${title}`
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

app.get("/api", (req, res) => {
  const { releaseDts, query: movieNm } = req.query;
  getChartData(releaseDts, movieNm).then((response) => {
    res.json(response.data);
  });
});

app.get("/api/detail", (req, res) => {
  const { moviename, release } = req.query;
  getDetailInfo(release, moviename).then((response) => {
    res.json(response.data);
  });
});

app.get("/api/search", (req, res) => {
  const { title } = req.query;
  getSearchData(title).then((response) => {
    res.json(response.data);
  });
});

module.exports = app;
