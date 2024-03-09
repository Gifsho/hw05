import express from "express";
import { mysql, conn, queryAsync } from "../dbconn";
import { CreatorsGet } from "../model/creators_get";
const router = express.Router();

// router.get("/", (req, res) => {
//   conn.query(`SELECT GROUP_CONCAT(movies.title) AS Movies, persons.name as Director, persons.birthday as Birthday, persons.bio as Bio
//               FROM creators 
//               INNER JOIN persons ON creators.personName = persons.pid
//               INNER JOIN movies ON creators.movieName = movies.mid 
//               GROUP BY persons.name`, (err, result, fields) => {
//     if (result && result.length > 0) {
//       res.json(result);
//     }
//     else {
//       res.json({
//         success: false,
//         Error: "No data found."
//       });
//     }
//   });
// });

router.get("/", (req, res) => {
  conn.query(`SELECT movies.title AS Movies, persons.name as Director, persons.birthday as Birthday, persons.bio as Bio
              FROM creators 
              INNER JOIN persons ON creators.personName = persons.pid
              INNER JOIN movies ON creators.movieName = movies.mid`, (err, result, fields) => {
    if (result && result.length > 0) {
      res.json(result);
    }
    else {
      res.json({
        success: false,
        Error: "No data found."
      });
    }
  });
});

router.get("/:name", (req, res) => {
  const creatorsName = req.params.name;
  conn.query(`
      SELECT movies.title AS Movie, persons.name AS Director, persons.birthday AS Birthday, persons.bio AS Bio
      FROM creators 
      INNER JOIN persons ON creators.personName = persons.pid
      INNER JOIN movies ON creators.movieName = movies.mid 
      WHERE persons.name = ?
  `, [creatorsName], (err, result, fields) => {
    if (result && result.length > 0) {
      res.json(result);
    }
    else {
      res.json({
        success: false,
        Error: "No data found."
      });
    }
  });
});

router.post("/insert", async (req, res) => {
  let person: CreatorsGet = req.body;
  let personId: number;
  let sql = mysql.format("select pid from persons where name = ?", [person.personname])
  let result = await queryAsync(sql);
  let jsonStr = JSON.stringify(result);
  let jsonobj = JSON.parse(jsonStr);
  let rowData = jsonobj;
  personId = rowData[0].pid;

  let movieId: number;
  sql = mysql.format("select mid from movies where title = ?", [person.moviename])
  result = await queryAsync(sql);
  jsonStr = JSON.stringify(result);
  jsonobj = JSON.parse(jsonStr);
  rowData = jsonobj;
  movieId = rowData[0].mid;


  sql = "INSERT INTO `creators`(`movieName`, `personName`) VALUES (?,?)";
  sql = mysql.format(sql, [
    movieId,
    personId,
  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201)
      .json({ affected_row: result.affectedRows, last_idx: result.insertId });
  });
});


router.delete("/del/:person/:movie", async (req, res) => {
  const person = req.params.person;
  const movie = req.params.movie;

  let personId: number;
  let sql = mysql.format("select pid from persons where name = ?", [person])
  let result = await queryAsync(sql);
  let jsonStr = JSON.stringify(result);
  let jsonobj = JSON.parse(jsonStr);
  let rowData = jsonobj;
  personId = rowData[0].pid;

  let movieId: number;
  sql = mysql.format("select mid from movies where title = ?", [movie])
  result = await queryAsync(sql);
  jsonStr = JSON.stringify(result);
  jsonobj = JSON.parse(jsonStr);
  rowData = jsonobj;
  movieId = rowData[0].mid;

  conn.query("delete from creators where movieName = ? and personName = ?", [movieId, personId], (err, result) => {
    if (err) throw err;
    res
      .status(200)
      .json({ affected_row: result.affectedRows })
      ;
  });
});

router.delete("/delId/:pid/:mid", (req, res) => {
  let pid = +req.params.pid;
  let mid = +req.params.mid;
  conn.query("delete from creators where movieName = ? and personName = ?", [mid, pid], (err, result) => {
    if (err) throw err;
    res
      .status(200)
      .json({ affected_row: result.affectedRows });
  });
});

export default router;