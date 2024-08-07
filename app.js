const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const getData = async (releaseDts, movieNm) => {
  try {
    const response = await axios.get(
      `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${process.env.KMDB_API_KEY}&releaseDts=${releaseDts}&query=${movieNm}`
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

app.get("/api", (req, res) => {
  const { releaseDts, query } = req.query;
  const movieNm = decodeURIComponent(query)
  getData(releaseDts, movieNm).then((response) => {
    res.json(response.data)
  })
});

module.exports = app;
