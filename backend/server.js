// server.js
import express, { json } from "express";
import cors from "cors"; // Make sure this file contains your MongoDB connection logic
import ruleRoutes from "./routes/ruleRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import Rule from "./models/rule.js";

connectDB();

const app = express();
app.use(cors());
app.use(json());
app.use(express.json());


app.post('/api/rules', async (req, res) => {
  const { inputString, ast } = req.body;

  const rule = new Rule({
      inputString,
      ast,
  });

  try {
      const savedRule = await rule.save();
      res.status(201).json(savedRule);
  } catch (error) {
      res.status(400).json({ error: 'Error creating rule', details: error });
  }
});

//fetch api 
app.get('/api/rules', async (req, res) => {
  try {
      const rules = await Rule.find();
      res.status(200).json(rules);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching rules', details: error });
  }
});

const PORT = process.env.PORT || 5000;
app.use("/api/rules", ruleRoutes); // Mount the rule routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
