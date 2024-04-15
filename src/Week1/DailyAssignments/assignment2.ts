require("dotenv").config();

import http, { ServerResponse, IncomingMessage } from "http";

const server = http.createServer((req, res) => {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const receivedObject = JSON.parse(data);

    receivedObject.lastName = "Choudhary";
    const modifiedObject = JSON.stringify(receivedObject);
    res.write(modifiedObject + "\n\n");

    switch (req.method) {
      case "GET":
        res.end(`It's a GET request! The endpoint is ${req.url}`);
        break;
      case "POST":
        res.end(`It's a POST request! The endpoint is ${req.url}`);
        break;
      case "PUT":
        res.end(`It's a PUT request! The endpoint is ${req.url}`);
        break;
      case "DELETE":
        res.end(`It's a DELETE request! The endpoint is ${req.url}`);
        break;
      default:
        res.end("It's not a PUT, POST, GET, DELETE request.");
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}!`);
});
