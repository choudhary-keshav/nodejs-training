const express = require("express");
const fs = require("fs");
const app = express();

import { Request, Response, NextFunction } from "express";

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.query;

  try {
    const users = JSON.parse(fs.readFileSync("credentials.json"));
    const isValidUser = users.some(
      (user: any) => user.email === email && user.password === password
    );

    if (isValidUser) {
      next(); 
    } else {
      res.status(401).send("Unauthorized"); 
    }
  } catch (error) {
    console.error("Error reading credentials:", error);
    res.status(500).send("Internal Server Error");
  }
};

app.use(authenticateUser);

app.get("/", (req: Request, res: Response) => {
  res.send("Home Page, credentials matched!");
});

app.get("/protected", (req: Request, res: Response) => {
  res.send("Protected Route");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
