import express, { Request, Response } from "express";
import { conn } from "../dbconn"; // นำเข้า conn จากไฟล์ dbconn
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    const sql = `
    SELECT
        movies.*,
        creator.name AS Director,
        GROUP_CONCAT(actor.name) AS Actor
    FROM
        movies
        INNER JOIN creators ON movies.mid = creators.movieName
        INNER JOIN persons AS creator ON creators.personName = creator.pid
        INNER JOIN stars ON movies.mid = stars.movieName
        INNER JOIN persons AS actor ON stars.personName = actor.pid
    WHERE
        actor.type IN ('Actor', 'Actress')
    GROUP BY
        movies.title
`;

    conn.query(sql, (err, result, fields) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        res.json(result);
    });
});


router.get("/:title", (req: Request, res: Response) => {
    const title = `%${req.params.title}%`; // ใช้ req.params.title เพื่อรับชื่อหนังจาก URL
    const sql = `
    SELECT
        movies.*,
        stars.personName AS actor_id,
        actor.name AS actor_name,
        actor.birthday AS actor_birthday,
        actor.bio AS actor_bio,
        creators.personName AS creator_id,
        creator.name AS creator_name,
        creator.birthday AS creator_birthday,
        creator.bio AS creator_bio
    FROM
        movies
        INNER JOIN stars ON movies.mid = stars.movieName
        INNER JOIN persons AS actor ON stars.personName = actor.pid
        INNER JOIN creators ON movies.mid = creators.movieName
        INNER JOIN persons AS creator ON creators.personName = creator.pid
    WHERE
        movies.title LIKE ?
`;
    
    conn.query(sql, [title], (err, results: any[], fields) => {
        if (err) throw err;

        
        const moviesMap = new Map<number, any>();

        results.forEach((row: any) => {
            const movieId = row.mid;

            if (!moviesMap.has(movieId)) {
                moviesMap.set(movieId, {
                    movie_id: row.mid,
                    movie_title: row.title, 
                    movie_plot: row.plot, 
                    movie_genre: row.genre, 
                    actors: [],
                    creators: [],
                });
            }

            const movie = moviesMap.get(movieId);

            const actor = {
                actor_id: row.actor_id,
                actor_name: row.actor_name,
                actor_birthday: row.actor_birthday,
                actor_bio: row.actor_bio,
            };

            const creator = {
                creator_id: row.creator_id,
                creator_name: row.creator_name,
                creator_birthday: row.creator_birthday,
                creator_bio: row.creator_bio,
            };

            // เพิ่มเช็คว่านักแสดงหรือผู้กำกับซ้ำหรือไม่
            if (!movie.actors.find((a: any) => a.actor_id === actor.actor_id)) {
                movie.actors.push(actor);
            }

            if (!movie.creators.find((c: any) => c.creator_id === creator.creator_id)) {
                movie.creators.push(creator);
            }
        });

        const jsonData = { movies: Array.from(moviesMap.values()) };
        res.json(jsonData);
    });
});

export default router;
