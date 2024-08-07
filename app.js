const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 8080;



const getData = async (releaseDts,movieNm) => {
    const url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${
        process.env.KMDB_API_KEY
      }`
    let res;
    try {
        res = await axios.get(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${
        process.env.KMDB_API_KEY
      }&releaseDts=${releaseDts}&query=${movieNm}`);
      return response
    } catch (err) {
        console.error(err)
    }
}


app.get('/api' , (req, res) => {
    const query = req.query;
    const releaseDts = query.releaseDts
    const movieNm = query.query

    try {
        const data = await getData(releaseDts, movieNm);
        res.json(data)
    } catch (err) {
        res.status(500).send('KMDB 연결 에러')
    }
})

app.listen(port, () => console.log("8080 server"));
