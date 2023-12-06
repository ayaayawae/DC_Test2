import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get('/', async (req, res) => {
  res.send({ status: 'success' })
})

app.use("/api", router);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(5000, '0.0.0.0', () =>
  console.log(`Server started`)
);
