const express = require("express");
const cors = require('cors')
const router = require("./modules/index.module");
const listsRouter = require("./modules/lists.module");


const app = express();

const PORT = 5050;

app.use(cors());
app.use(express.json());
app.use(router);

app.use("/", listsRouter);

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
})