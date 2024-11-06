import express, { Express } from "express";
import bodyParser from 'body-parser';
import { addEasyMeet, listEasyMeet, getEasyMeet, updateEasyMeet } from "./routes";


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());
app.get("/api/list", listEasyMeet);
app.post("/api/add", addEasyMeet);
app.post("/api/update", updateEasyMeet);
app.post("/api/get", getEasyMeet);
app.listen(port, () => console.log(`Server listening on ${port}`));