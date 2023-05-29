const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require('lodash');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

var posts = [];

const home_content = "Welcome to our Blog we keep your data safe only because no one wants to buy your data from us";
const about_content = "this is an Awsome blog which lets you write about your daily experiences, your happiness and your sorrows, your goals how you plan on avhieving them or anything that you like";
const contact_content = "I don't really see the point as this is a very simple web site but still if you want to you can mail your questions at kumarabhi2k21@gmai.com";
app.get("/", function (req, res) {
  res.render('home', { starting_content: home_content, blogs: posts });
});

app.get("/about", function (req, res) {
  res.render('about', { starting_content: about_content });
});

app.get("/contact", function (req, res) {
  res.render('contact', { starting_content: contact_content });
});

app.get("/compose", function (req, res) {
  res.render('compose');
});

app.get("/posts/:topic", function (req, res) {
  var required = req.params.topic;
  var main_content;
  required = _.lowerCase(required);
  console.log(required);
  var flag = 0;
  for (var i = 0; i < posts.length; i++) {
    var temp = _.lowerCase(posts[i].blog_title);
    if (temp == required) {
      main_content = posts[i].blog_entry;
      flag = 1;
      break;
    }
  }
  if (flag == 0)
    console.log("not found");
  else
    res.render('post', { topic: required, blog: main_content });
});

// creating response for the post request in the home page

app.post("/", function (req, res) {
  const blog_title = req.body.title;
  const blog_entry = req.body.blog_entry;
  const content = {
    blog_title,
    blog_entry
  };
  posts.push(content);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("server started");
});