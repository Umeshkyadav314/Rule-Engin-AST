import React, { useState } from "react";
import Button from "./Button";

const RuleEvaluation = ({ rules, selectedRules = [], operator }) => {
  const [userData, setUserData] = useState({
    age: "",
    department: "",
    income: "",
    spend: "",
  });
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const evaluateRules = () => {
    // Check if selectedRules is an array and has items
    if (!Array.isArray(selectedRules) || selectedRules.length === 0) {
      console.error("No selected rules available for evaluation.");
      setEvaluationResult(null); // Optionally reset the result
      return; // Exit if selectedRules is empty or not an array
    }

    const results = selectedRules.map((ruleId) => {
      const rule = rules.find((rule) => rule._id === ruleId);
      let isValid = true;

      if (rule && rule.conditions) {
        for (const condition of rule.conditions) {
          const { field, operator: ruleOperator, value } = condition;
          const userValue = userData[field];

          switch (ruleOperator) {
            case ">":
              isValid = isValid && Number(userValue) > value;
              break;
            case "<":
              isValid = isValid && Number(userValue) < value;
              break;
            case "===":
              isValid = isValid && userValue === value;
              break;
            // Add more operators as needed
            default:
              break;
          }
        }
      }

      return { ruleId, result: isValid };
    });

    // Evaluate final result based on the operator
    const finalResult = results.reduce((acc, current) => {
      return operator === "AND" ? acc && current.result : acc || current.result;
    }, operator === "AND"); // Start with true for AND, false for OR

    setEvaluationResult(finalResult);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2 ml-3">Rule Evaluation:</h2>
      <div className="flex flex-col mb-4 w-1/2">
        <label className="mb-2 p-2 w-1/2">
          <input
            placeholder="Enter Your Age"
            type="number"
            name="age"
            value={userData.age}
            onChange={handleChange}
            className="border rounded p-1 ml-2"
            required
          />
        </label>
        <label className="mb-2 p-2">
          <input
            placeholder="Enter Your Department"
            type="text"
            name="department"
            value={userData.department}
            onChange={handleChange}
            className="border rounded p-1 ml-2"
            required
          />
        </label>
        <label className="mb-2 p-2">
          <input
            placeholder="Enter Your Income"
            type="number" // Use number instead of double
            name="income"
            value={userData.income}
            onChange={handleChange}
            className="border rounded p-1 ml-2"
            required
          />
        </label>
        <label className="mb-2 p-2">
          <input
            placeholder="Enter Your Spend"
            type="number" // Use number instead of double
            name="spend"
            value={userData.spend}
            onChange={handleChange}
            className="border rounded p-1 ml-2"
            required
          />
        </label>
      </div>
      <div className="ml-5">
        <Button onClick={evaluateRules} label="Evaluate Rules" />
        {evaluationResult !== null && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Evaluation Result:</h3>
            <p>{evaluationResult ? "True" : "False"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RuleEvaluation;
