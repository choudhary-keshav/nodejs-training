const path = require("path");
const multer = require("multer");
const express = require("express");

import { Request, Response } from "express";

const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
  destination: function (req:Request, file:any, cb:any) {
    cb(null, "./uploads");
  },
  filename: function (req:Request, file:any, cb:any) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req:Request, res:Response) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), (req:any, res:Response) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Server started at PORT - ${PORT}`));
