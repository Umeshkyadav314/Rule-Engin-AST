// src/components/ASTViewer.jsx
import React, { useEffect, useState } from 'react';
import { fetchCombinedAST } from '../utils/fetchCombinedAST';

function CombinedViewer({ rules }) {
  const [ast, setAST] = useState(null);

  useEffect(() => {
    if (rules.length > 0) {
      fetchCombinedAST(rules)
        .then(setAST)
        .catch(console.error);
    }
  }, [rules]);

  return (
    <div>
      <h2>Combined AST for Rules</h2>
      <pre>{ast ? JSON.stringify(ast, null, 2) : "Add rules to view combined AST"}</pre>
    </div>
  );
}

export default CombinedViewer;
