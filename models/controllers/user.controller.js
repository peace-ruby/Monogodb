const { request, response } = require("express")

const fetchData = (request, response)=>{
    response.render('signup')
}

const logData = (request, response) =>{
    res.render("login")
}

module.exports={
    fetchData,
    logData
}