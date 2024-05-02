const express = require("express");
import { Request, Response } from "express";
import mongoose from "mongoose";
const Order = require("./models/order");
const Person = require("./models/person");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/orders")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.post('/persons', async (req:Request, res:Response) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/persons", async (req: Request, res: Response) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/orders", async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/orders", async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("person");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/persons/:personId/total-order-price', async (req: Request, res: Response) => {
  try {
    const personId = req.params.personId;

    const result = await Order.aggregate([
      {
        $match: { person: mongoose.Types.ObjectId.createFromHexString(personId) }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$totalAmount' }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Person not found or no orders for this person' });
    }

    res.json({ totalOrderPrice: result[0].totalAmount });
  } catch (error) {
    console.error('Error calculating total order price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
