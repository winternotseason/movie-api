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

const getDetailInfo = async (releaseDts, title) => {
  try {
    const response = await axios.get(
      `//api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${process.env.KMDB_API_KEY}&releaseDts=${releaseDt}&title=${title}`
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

const getSearchData = async (title) => {
  try {
    const response = await axios.get(
      `//api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${process.env.KMDB_API_KEY}&title=${title}`
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

app.get("/api", (req, res) => {
  const { releaseDts, query: movieNm } = req.query;
  getChartData(releaseDts, query).then((response) => {
    res.json(response.data);
  });
});

app.get("/api/detail", (req, res) => {
  const { releaseDts, title } = req.query;
  getDetailInfo(releaseDts, title).then((response) => {
    res.json(response.data);
  });
});

app.get('/api/search', (req,res) => {
  const { title } = req.query;
  getSearchData(title).then((response) => {
    res.json(response.data)
  })
})

module.exports = app;
