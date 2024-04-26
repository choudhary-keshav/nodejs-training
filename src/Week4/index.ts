const express = require("express");
const app = express();

import { Request, Response } from "express";

app.use(express.json());
const mongoose = require("mongoose");
const User=require("./UserModel");

const uri = "mongodb://localhost:27017";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: Error) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/:name", async (req: Request, res: Response) => {
  const name = req.params.name;
  if (name === "favicon.ico") {
    return;
  }
  try {
    const existingUser = await User.findOne({ name });
    console.log(existingUser);
    if (existingUser) {
      res.status(201).json(existingUser);
    } else {
      console.log("----------------CREATED NEW USER-------------------");
      const newUser = new User({ name });
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/:name", async (req: Request, res: Response) => {
  const { name } = req.params;

  const { age, city, balance, transactionType, amount } = req.body;

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      if (age) existingUser.age = age;
      if (city) existingUser.city = city;
      if (balance && transactionType) {
        if (transactionType === "credit") {
          existingUser.balance += amount;
        } else if (transactionType === "debit") {
          existingUser.balance -= amount;
        } else {
          return res.json({
            message: "Transaction type can only be either 'credit' or 'debit'.",
          });
        }
      }
      await existingUser.save();
      res.status(201).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User does not even exist!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/:name", async (req: Request, res: Response) => {
  const name = req.params.name;
  try {
    const result = await User.deleteOne({ name });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Object not found" });
    }
    res.status(201).json({ message: "User successfully deleted from the database!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
