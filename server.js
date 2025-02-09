const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const port = 5000;

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.sendFile(path.join(initial_path, "home.html"));
});

app.get("/editor", (req, res) => {
  res.sendFile(path.join(initial_path, "editor.html"));
});

// upload link
app.post("/upload", (req, res) => {
  let file = req.files.image;
  let date = new Date();
  // image name
  let imagename = date.getDate() + date.getTime() + file.name;
  // image upload path
  let path = "public/uploads/" + imagename;

  // create upload
  file.mv(path, (err, result) => {
    if (err) {
      throw err;
    } else {
      // our image upload path
      res.json(`uploads/${imagename}`);
    }
  });
});
app.listen(port, () => {
  console.log(`listing on port ${port}`);
});
