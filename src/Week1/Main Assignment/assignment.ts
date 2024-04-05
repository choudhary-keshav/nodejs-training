import express, { Request, Response } from "express";
import fs from "fs";
const app = express();

app.use(express.json());

app.post("/", (req: Request, res: Response) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading JSON file" });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const filePath = "output.json";

      const filteredData = jsonData.filter(
        (item: any) => item.postId % 2 === 0
      );

      const jsonString = JSON.stringify(filteredData);
      fs.writeFile(filePath, jsonString, (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("JSON object written to file successfully!");
        }
      });
      res.json(filteredData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).json({ error: "Error parsing JSON data" });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}!`);
});
