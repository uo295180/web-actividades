const express = require("express")

const routerActivities = express.Router();
let activities = require("../data/activities")
let users = require("../data/users")

routerActivities.get("/", (req, res) => {
    res.render("index", {
        activities: activities
    })
})

routerActivities.post("/donate", (req, res) => {
    let userName = req.body.userName
    let password = req.body.password
    let activityName = req.body.activityName
    let money = parseFloat(req.body.money)

    if(money <= 0){
        res.send("You must donate a quantity above zero")
        return
    }

    // Checks
    let user = users.find( u => u.name==userName && u.password == password)
    if(user == null){
        res.send("Error")
        return
    }
    if ( user.money < money ){
        res.send("You dont have money")
        return
    } 
    
    let activity = activities.find( a => a.name == activityName )
    if( activity == null ){
        res.send("Not valid activity")
        return
    }

    user.money = user.money - money
    activity.money = activity.money + money
    res.redirect("/activities")
})

module.exports = routerActivities