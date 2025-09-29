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

    const jobType = pubsubMessage.attributes?.jobType;

    console.log("jobType", jobType);

    // process job
    console.log("processing payload", payload);
    res.status(204).send(); // Pub/Sub expects success status
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

// Bulk upload route
app.post("/bulk-upload", async (req, res) => {
  console.log("inside bulk upload route");
  try {
    const pubsubMessage = req.body.message;
    const jobType = pubsubMessage.attributes?.jobType;

    console.log("jobType", jobType);

    const dataStr = Buffer.from(pubsubMessage.data, "base64").toString();
    const payload = JSON.parse(dataStr);

    console.log("Bulk upload job:", payload);
    // TODO: bulk upload logic

    res.status(204).send(); // ack success
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

// AI analysis route
app.post("/ai-analysis", async (req, res) => {
  console.log("inside ai analysis");

  try {
    const pubsubMessage = req.body.message;
    const dataStr = Buffer.from(pubsubMessage.data, "base64").toString();
    const payload = JSON.parse(dataStr);
    const jobType = pubsubMessage.attributes?.jobType;

    console.log("jobType", jobType);

    console.log("AI analysis job:", payload);
    // TODO: AI analysis logic

    res.status(204).send();
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
