import express from "express";
const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const pubsubMessage = req.body.message;
    if (!pubsubMessage) return res.status(400).send("no message");
    console.log("pubsubMessage", pubsubMessage);
    const dataStr = Buffer.from(pubsubMessage.data, "base64").toString();
    const payload = JSON.parse(dataStr);
    // process job
    console.log("processing payload", payload);
    // TODO: idempotency checks, DB writes, etc.
    res.status(204).send(); // Pub/Sub expects success status
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening ${port}`));
