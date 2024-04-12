//localhost:3000/?email=user2@example.com&password=password2
//localhost:3000/

const express = require("express");
const fs = require("fs");
const app = express();

const authenticateUser = (req: any, res: any, next: any) => {
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

app.get("/", (req: any, res: any) => {
  res.send("Home Page, credentials matched!");
});

app.get("/protected", (req: any, res: any) => {
  res.send("Protected Route");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
