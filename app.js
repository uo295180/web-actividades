const express = require("express")

const app = express()
const port = 8081

let routerActivities = require("./routers/routerActivities")
app.use("/activities", routerActivities)

app.listen(port, () => {
    console.log("Servisor activo en " + port)
})