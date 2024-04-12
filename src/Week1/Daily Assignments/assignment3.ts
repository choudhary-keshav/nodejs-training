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

const fetchData = async () => {
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
  if (data !== null) {
    res.json(data);
  } else {
    res.status(500).json({ error: "Error in fetching data from API" });
  }
});

app.post("/:postId?", async (req: Request, res: Response) => {
  const { postId } = req.params;
  const data = await fetchData();

  if (data !== null && postId) {
    const filteredData = data.filter(
      (item: any) => item.postId === parseInt(postId)
    );
    res.json(filteredData);
  } else if (!postId) {
    res.status(400).json({ error: "Post ID is missing in the URL" });
  } else {
    res.status(500).json({ error: "Error in fetching data from API" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}!`);
});
