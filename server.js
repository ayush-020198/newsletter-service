const express = require('express');
const https = require("https");
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res)=>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/9433400c84";

    const options = {
        method: "POST",
        auth: "ayush786:6566c535fd20ab2c1338ad051bb5ea41-us20"
    }

    const request = https.request(url, options, (response) => {

        if(response.statusCode===200){
            res.sendFile(__dirname +"/success.html")
        } else {
            res.sendFile(__dirname +"/failure.html")
        }
        console.log(response.statusCode);

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

    console.log(firstName, lastName, email);
})

app.post('/failure', (req, res)=>{
    res.redirect("/")
})

app.listen(process.env.PORT || 5000, console.log("Running on PORT 5000"));

//api key
//
// uniqueID
// 