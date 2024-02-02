import express from "express";
import cors from "cors";
import {config} from "./common/config/index.js";
import module from "./modules/app.module.js";

const app = express();

app.use(cors({origin: "*"}));
app.use(express.json());
app.use("/api", module.router);

app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
});
