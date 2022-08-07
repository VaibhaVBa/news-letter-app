const express =require("express");
const BodyParser =require("body-parser");
const request =require("request");
const https=require("https");
const app =express();
app.use(BodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
// var first_name = req.body.First_name
// var last_name =  req.body.Last_name
// var email =  req.body.Email
const first_name = req.body.First_name
const last_name =  req.body.Last_name
const email =  req.body.Email
// console.log(first_name,last_name,email);
var data ={
    members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME : first_name,
                LNAME :last_name,
                EMAIL :email,
            }
        }
    ]
    
}
// var JSONdata =JSON.stringify(data);
const JSONdata =JSON.stringify(data);

const url="https://us12.api.mailchimp.com/3.0/lists/5df395c2d2"
const options ={
    method: "POST",
    auth:"VAIBHAV:a449f8da42ed1ec3e151881e2db886bb-us12"
}
const request =https.request(url,options,function(response){
    if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
    console.log(JSON.parse(data));
})
})

request.write(JSONdata);
request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server started........");
});

// API KeyboardEvent
// a449f8da42ed1ec3e151881e2db886bb-us12

// Audience key
// 5df395c2d2
// 5df395c2d2