require("dotenv").config();

import express, { Request, Response } from "express";
const app = express();

interface Post {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const fetchData = async (): Promise<Post|null> => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in fetching data from API");
    return null;
  }
};

app.get("/", async (req: Request, res: Response) => {
  const data = await fetchData();
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: "Error in fetching data from API" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}!`);
});
