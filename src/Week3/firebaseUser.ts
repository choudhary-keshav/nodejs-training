const express = require("express");
const app = express();
require("dotenv").config();

import { Request, Response } from "express";

const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/newUser", async (req:Request, res:Response) => {
  try {
    const id = req.body.email;
    const user = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const userSnapshot = await db.collection("users").doc(user.email).get();
    if (userSnapshot.exists) {
      return res.status(404).json({ error: "User already exists, use some other email" });
    }
    const response = await db.collection("users").doc(id).set(user);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.get("/allUsers", async (req:Request, res:Response) => {
  try {
    const userRef = db.collection("users");
    const userData = await userRef.get();
    let allUsers: any = [];
    userData.forEach((doc:any) => {
      allUsers.push(doc.data());
    });
    res.send(allUsers);
  } catch (error) {
    res.send(error);
  }
});

app.put("/updateName", async (req:Request, res:Response) => {
  try {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userSnapshot = await db.collection("users").doc(email).get();
    if (!userSnapshot.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    const userRef = await db.collection("users").doc(email).update({
      firstName: firstName,
      lastName: lastName,
    });
    return res.status(200).json({ message: "Name updated successfully" });
  } catch (error) {
    console.error("Error updating first name:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteUser", async (req:Request, res:Response) => {
  try {
    const email = req.body.email;
    const userSnapshot = await db.collection("users").doc(email).get();
    if (!userSnapshot.exists) {
      return res.status(404).json({ error: "User not even exist" });
    }
    const userRef = await db.collection("users").doc(email).delete();
    res.send("User deleted successfully!");
  } catch (error) {
    res.send(error);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
