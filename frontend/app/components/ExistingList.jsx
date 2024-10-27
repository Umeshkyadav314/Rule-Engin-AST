// components/RuleList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported

const ExistingList = () => {
  const [rules, setRules] = useState([]); // Initialize state for rules
  const [selectedRules, setSelectedRules] = useState([]); // State to keep track of selected rules

  const fetchRules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rules");
      setRules(response.data); // Update the rules state with fetched data
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };

  // Fetch rules on component mount
  useEffect(() => {
    fetchRules();
  }, []);

  const handleCheckboxChange = (ruleId) => {
    setSelectedRules((prev) =>
      prev.includes(ruleId)
        ? prev.filter((id) => id !== ruleId) // Deselect if already selected
        : [...prev, ruleId] // Select if not already selected
    );
  };

  return (
    <div className="p-4 border ml-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Existing Rules:</h2>
      {rules.length > 0 ? (
        <ul>
          {rules.map((rule) => (
            <li key={rule._id}>
              <input
                type="checkbox"
                checked={selectedRules.includes(rule._id)} // Check if the rule is selected
                onChange={() => handleCheckboxChange(rule._id)} // Handle checkbox change
                className="mr-2"
              />
              {rule.inputString} <br />
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-2">No rules found.</p>
      )}
    </div>
  );
};

export default ExistingList;
