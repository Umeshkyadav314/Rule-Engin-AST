// components/RuleCombination.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";

const RuleCombination = ({ onCombine }) => {
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [operator, setOperator] = useState("AND");

  // Fetch existing rules from the API
  const fetchRules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rules");
      setRules(response.data); // Set the fetched rules
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };

  // Fetch rules on component mount
  useEffect(() => {
    fetchRules();
  }, []);

  const handleRuleChange = (ruleId) => {
    setSelectedRules((prev) =>
      prev.includes(ruleId)
        ? prev.filter((id) => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  const handleCombine = () => {
    if (selectedRules.length > 0) {
      onCombine({ rules: selectedRules, operator });
      setSelectedRules([]); // Reset selection after combining
    }
  };

  return (
    <div className="p-4 border rounded ml-4">
      <h2 className="text-xl font-semibold mb-4">Combine Rules:</h2>
      <div className="flex flex-col mb-4">
        {rules.map((rule) => (
          <label key={rule._id} className="flex items-center mb-2 ">
            <input
              type="checkbox"
              checked={selectedRules.includes(rule._id)} // Check if the rule is selected
              onChange={() => handleRuleChange(rule._id)}
              className="mr-2"
            />
            {rule.inputString} {/* Display the rule's input string */}
          </label>
        ))}
      </div>
     
      <Button onClick={handleCombine} label="Combine Rules" />
    </div>
  );
};

export default RuleCombination;
