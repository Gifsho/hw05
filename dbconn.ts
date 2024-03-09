import mysql from "mysql";
import util from "util";
export const conn = mysql.createPool(
    {
        "host": "sql6.freemysqlhosting.net",
        "user": "sql6689589",
        "database": "sql6689589",
        "password": "Fw8QEKRJJ7"
    }
);
export const queryAsync = util.promisify(conn.query).bind(conn);
export { mysql };