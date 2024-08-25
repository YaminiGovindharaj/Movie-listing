require("dotenv").config();
const express =require("express")
const movierouter=require("./routes/movies/movie.js")
const db = require("./db/index.js")
const app=new express();
const port=process.env.PORT || 8000;

db()
app.use(express.json());
app.use("/movie",movierouter);

app.listen(port,()=>{
    console.log(   `express app listenoing https://localhost:${port}`)
});