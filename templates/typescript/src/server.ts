import express from "express"
import cors from "cors"
import morgan from "morgan"
import mainRoutes from "./routes/mainRoutes"

const app = express();
const PORT = process.env.PORT || 3000


app.use(express.static("./public"))

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))


app.use("/", mainRoutes)

app.listen(PORT, () => {
    console.log("server is listening at port "+ PORT);
})