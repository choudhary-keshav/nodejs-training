const express = require("express");
const app = express();

import { Request, Response } from "express";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    type: Number,
    default: 18,
  },
  balance: {
    type: Number,
    default: 0,
  },
  city: {
    type: String,
    default: "Hyderabad",
  },
});

const User = mongoose.model("User", userSchema);

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
      res.json(existingUser);
    } else {
      console.log("----------------CREATED NEW USER-------------------");
      const newUser = new User({ name });
      await newUser.save();
      res.json(newUser);
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/:name/age/:age", async (req: Request, res: Response) => {
  const name = req.params.name;
  const age = req.params.age;
  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      existingUser.age = age;
      await existingUser.save();
      res.json({ message: "Age updated successfully" });
    } else {
      res.json({ message: "User does not even exist!" });
    }
  } catch (error) {
    res.send(error);
  }
});

app.put("/:name/city/:city", async (req: Request, res: Response) => {
  const name = req.params.name;
  const city = req.params.city;
  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      existingUser.city = city;
      await existingUser.save();
      res.json({ message: "City updated successfully" });
    } else {
      res.json({ message: "User does not even exist!" });
    }
  } catch (error) {
    res.send(error);
  }
});

app.put("/:name/:type/:amount", async (req: Request, res: Response) => {
  const name = req.params.name;
  const amount = Number(req.params.amount);
  const transactionType = req.params.type;
  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      if (transactionType === "credit") {
        existingUser.balance = existingUser.balance + amount;
      } else if (transactionType === "debit") {
        existingUser.balance = existingUser.balance - amount;
      } else {
        res.json({
          message: "Transaction type can only be either 'credit' or 'debit'.",
        });
      }
      await existingUser.save();
      res.json({ message: "Amount successully credited in user's account!" });
    } else {
      res.json({ message: "User does not even exist!" });
    }
  } catch (error) {
    res.json(error);
  }
});

app.delete("/:name", async (req: Request, res: Response) => {
  const name = req.params.name;
  try {
    const result = await User.deleteOne({ name });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Object not found" });
    }
    res.json({ message: "User successfully deleted from the database!" });
  } catch (error) {
    res.json(error);
  }
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
