// routes/ruleRoutes.js
import { Router } from "express";
import { create_rule, combine_rules } from "../controllers/ruleControllers.js";

const router = Router();

// Route to create a new rule
router.post("/create", async (req, res) => {
  try {
    const { string } = req.body;

    // Validate the input
    if (!string) {
      return res.status(400).json({ message: "Rule string is required" });
    }

    const ast = create_rule(string); // Create the AST from the string
    const newRule = new Rule({ string, ast }); // Create a new Rule instance
    await newRule.save(); // Save the new rule to the database

    res.status(201).json(newRule); // Return the newly created rule
  } catch (err) {
    console.error("Error creating rule:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to combine multiple rules
router.post("/combine", async (req, res) => {
  try {
    const { rules } = req.body;

    // Validate the input
    if (!Array.isArray(rules) || rules.length === 0) {
      return res.status(400).json({ message: "Rules array is required" });
    }

    const asts = rules.map(rule => create_rule(rule)); // Create ASTs for each rule
    const combinedAST = combine_rules(asts); // Combine the ASTs into one

    const combinedRule = new rules({ string: rules.join(' AND '), ast: combinedAST });
    await combinedRule.save(); // Save the combined rule to the database

    res.status(201).json(combinedRule); // Return the combined rule
  } catch (error) {
    console.error("Error combining rules:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to fetch all rules
router.get("/", async (req, res) => {
  try {
    const rules = await find(); // Fetch all rules from the database
    res.json(rules); // Return the list of rules
  } catch (err) {
    console.error("Error fetching rules:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
