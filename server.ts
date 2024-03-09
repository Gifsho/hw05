import http from "http"
import { app } from "./app";

//เช็คสภาพแวดล้อมเช็คว่า port ว่างไหม
const port = process.env.port || 3000;
//สร้าง server           //ทำความรู้จักกับ app ด้วย
const server = http.createServer(app);

//เปิดและรอการรับฟังว่าจะมีใครเชื่อมต่อมาไหมและใช้ port ไหน 2.ฟังชั่นอะโนนิมัสว่าให้ทำะไร
server.listen(port ,()=>{
    console.log("Server is running. " + port);
});