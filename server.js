const express = require("express");
const { createFile, createFolder } = require("./utils");
const postsData = require("./data/post.json");
const fs = require("fs");

const app = express();

//pass incoming data---middleware----
app.use(express.json());

//create folder
createFolder("data");
//create File
createFile("data/post.json", "content here");

//Routing
//home route
app.get("/", (req, res) => {
  res.send("This is Home Route!");
});

//fetch all posts
app.get("/posts", (req, res) => {
  res.json({
    message: "Posts Fetched Successfully!",
    postsData,
  });
});

//fetch single post
app.get("/posts/:id", (req, res) => {
  //get the id of post from url
  const id = req.params.id;

  //find post using id
  const postFound = postsData.find((post) => {
    return post.id === id;
  });
  //if post not found
  if (!postFound) { 
    res.json({
      message: "Check Id Again No Matching post for corresponding Id",
    });
  }
  res.json(postFound);
});

//create a post
app.post("/posts", (req, res) => {
  //get the post from user
  const newPost = req.body;
  // push the new post into existing post
  postsData.unshift({ ...newPost, id: postsData.length.toString() });
  console.log(postsData);

  //write to a file
  fs.writeFile("data/post.json", JSON.stringify(postsData), (err) => {
    if (err) {
      console.log(err);
    }
    //send message to the user
    res.json({ message: "Post created Successfully" });
  });
});

//update a post
app.put("/posts/:id", (req, res) => {
  //get dynamic id
  const id = req.params.id;
  const { url, title, desc } = req.body;

  //find the popst to update
  const foundPost = postsData.find(function (post) {
    return post.id === id;
  });
  if (!foundPost) {
    res.json({ message: "Post Not Found!" });
  }

  //filter out all posts with the post found
  const filteredPosts = postsData.filter((post) => {
    return post.id !== id;
  });
  //update the found post
  foundPost.title = title;
  foundPost.desc = desc;
  foundPost.url = url;

  //push the updated post into the filtered post array
  filteredPosts.unshift(foundPost); //unshift for order of latest post first

  //write to the file

  fs.writeFile("data/post.json", JSON.stringify(filteredPosts), (err) => {
    if (err) {
      console.log(err);
    }
    //send message to the user
    res.json({ message: "Post updated Successfully" });
  });
});

//Delete a Post
app.delete("/posts/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const filteredPosts = postsData.filter(function (post) {
    return post.id !== id;
  });
  //write to a file
  fs.writeFile("data/post.json", JSON.stringify(filteredPosts), (err) => {
    if (err) {
      console.log(err);
    }
    //send message to the user
    res.json({ message: "Post Deleted Successfully" });
  });
});
const port = 9000;
app.listen(port, () => {
  console.log(`Server is running on port on port ${port}`);
});
