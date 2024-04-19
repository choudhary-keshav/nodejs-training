export const add = (a: number, b: number) => {
  return a + b;
};

export const subtract = (a: number, b: number) => {
  return a - b;
};

export const multiply = (a: number, b: number) => {
  return a * b;
};

export const divide = (a: number, b: number) => {
  return a / b;
};

export const err = () => {
  throw new Error("I am a new error");
};

const express = require("express");
export const app = express();
import { Request, Response } from "express";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/users", (req: Request, res: Response) => {
  res.status(200).json({
    users: [
      {
        name: "Keshav",
        email: "keshavji.choudhary@gmail.com",
        passowrd:"keshav@123"
      },
    ],
  });
});
app.listen(3000);


