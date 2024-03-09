import express from "express";
import { conn, mysql, queryAsync } from "../dbconn";
import { PersonGet } from "../model/person_get";
const router = express.Router();

router.get("/", (req, res) => {
    conn.query('select * from persons', (err, result, fields) => {
        if (result && result.length > 0) {
            res.json(result);
        }
        else {
            res.json({
                success: false,
                Error: "Incorrect Select Person."
            });
        }
    });
});

router.get("/:personname", (req, res) => {
    const personname = req.params.personname;
    conn.query('select * from persons where name = ?', [personname], (err, result, fields) => {
        if (result && result.length > 0) {
            res.json(result);
        }
        else {
            res.json({
                success: false,
                Error: "Incorrect Select Person."
            });
        }
    });
});

router.post("/insert", (req, res) => {
    let person: PersonGet = req.body;
    let sql =
        "INSERT INTO `persons`(`pid`, `name`, `birthday`, `type`, `bio`) VALUES (?,?,?,?,?)";
    sql = mysql.format(sql, [
        person.pid,
        person.name,
        person.birthday,
        person.type,
        person.bio,
    ]);
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res
            .status(201)
            .json({ affected_row: result.affectedRows});
    });
});

router.delete("/del/:person", async (req, res) => {
    const person = req.params.person;
    let pid: number;
    let sql = mysql.format("select pid from persons where name = ?", [person])
    let result = await queryAsync(sql);
    const jsonStr = JSON.stringify(result);
    const jsonobj = JSON.parse(jsonStr);
    const rowData = jsonobj;
    pid = rowData[0].pid;
    conn.query("delete from persons where pid = ?", [pid], (err, result) => {
        if (err) throw err;
        res
            .status(200)
            .json({ affected_row: result.affectedRows });
    });
});

router.delete("/delId/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from persons where pid = ?", [id], (err, result) => {
        if (err) throw err;
        res
            .status(200)
            .json({ affected_row: result.affectedRows });
    });
});

export default router;