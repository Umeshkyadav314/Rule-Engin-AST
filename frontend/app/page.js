"use client"; // Mark as a client component

import React, { useState, useEffect } from "react";
import RuleInput from "./components/RuleInput";
import RuleList from "./components/ExistingList";
import RuleCombination from "./components/RuleCombination";
import RuleEvaluation from "./components/RuleEvaluation";
import axios from "axios";
import Navbar from "./components/Navbar";
import { SignIn} from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import Footer from "./components/Footer"


export default function Home() {
  const { isSignedIn } = useUser(); // Get the user's signed-in status
  const [rules, setRules] = useState([]);
  const [combinedRule, setCombinedRule] = useState(null);
  const [userAttributes, setUserAttributes] = useState({});

  // Fetch rules from the backend
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rules"); // Ensure URL matches your backend
        setRules(response.data);
      } catch (err) {
        if (err.response) {
          console.error("Error fetching rules:", err.response.data);
        } else if (err.request) {
          console.error("Error fetching rules: No response from server");
        } else {
          console.error("Error fetching rules:", err.message);
        }
      }
    };

    fetchRules();
  }, []);

  // Handle adding a new rule
  const handleAddRule = (newRule) => {
    setRules((prev) => [...prev, newRule]);
  };

  // Handle combining rules
  const handleCombineRules = (combined) => {
    setCombinedRule(combined);
  };

  return (
    <div className="flex h-[100vh] flex-col min-h-screen bg-gray-200">
      <Navbar/>
      {isSignedIn ? (
        // Show the main content if the user is logged in
        <main className="flex-grow w-1/2 m-auto flex flex-col space-y-5 pt-24">
          <h1 className="text-3xl font-bold text-center">Rule Engine</h1>
          <RuleInput onAdd={handleAddRule} />
          <RuleList rules={rules} />
          <RuleCombination rules={rules} onCombine={handleCombineRules} />
          {combinedRule && (
            <RuleEvaluation
              combinedRule={combinedRule}
              userAttributes={userAttributes}
            />
          )}
        </main>
      ) : (
        // Center the SignUp component if the user is not logged in
        <div className="flex flex-grow justify-center items-center mt-20 max-h-screen">
          <SignIn routing="hash" />
        </div>
      )}
      <Footer/>
    </div>
  );
}
