import express, { Request, Response } from "express";
const app = express();

interface StaticData {
  [key: string]: string;
}

const staticData: StaticData = {
  "/page1": "This is Page 1",
  "/page2": "This is Page 2",
  "/page3": "This is Page 3",
};

app.get("/:page", (req: Request, res: Response) => {
  const { page } = req.params;
  if (staticData.hasOwnProperty(`/${page}`)) {
    res.send(staticData[`/${page}`]);
  } else {
    res.status(404).send("Page not found");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
