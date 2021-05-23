//jshint esversion6
'use strict'

const mailchimp = require("@mailchimp/mailchimp_marketing");

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const https = require("https");
const port = 3000;
const path = require('path');

require('make-promises-safe');


//api Key for mailchimp
  //audience id -431dd0a153
//const apiKey="2e1428d55a7fda1da0e6e9ca5c4eca2b-us1";

mailchimp.setConfig({
  apiKey: "2e1428d55a7fda1da0e6e9ca5c4eca2b-us1",
  server: "us1"
});

app.use(express.static("assets"));  // static folder to use css and img files
app.use(bodyParser.urlencoded({extended:true}));

app.get('/contact_nodejs.html', function(req, res) {
  res.sendFile(__dirname + "/contact_nodejs.html");
});


app.get('*', (req, res)=> {
  const index = path.join(__dirname, '/', '/', 'Blog.html' );
  res.sendFile(index);
});


app.post("/contact_nodejs.html",function(req,res){

  const fullname =req.body.fullname;
  const email =req.body.email;
  const comment =req.body.comment;

  console.log(fullname,email,comment);

  const listId = "431dd0a153";
  const subscribingUser = {
    firstName: fullname,
    lastName: "McVankab",
    email: email
  };



  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });

    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.status}.`
    );
  }

  run();

})

  app.listen(3000,function(){
console.log("Server is running on port 3000")

});
